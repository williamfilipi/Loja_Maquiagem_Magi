import { useState, useEffect } from "react";

type QueryFn<T> = () => Promise<T>;

interface QueryState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useSupabaseQuery<T>(
  queryFn: QueryFn<T>,
  dependencies: any[] = [],
) {
  const [state, setState] = useState<QueryState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        const data = await queryFn();

        if (isMounted) {
          setState({
            data,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            isLoading: false,
            error: error instanceof Error ? error : new Error(String(error)),
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return state;
}

export function useMutation<T, P>(mutationFn: (params: P) => Promise<T>) {
  const [state, setState] = useState<{
    isLoading: boolean;
    error: Error | null;
    data: T | null;
  }>({
    isLoading: false,
    error: null,
    data: null,
  });

  const mutate = async (params: P) => {
    setState({ isLoading: true, error: null, data: null });

    try {
      const data = await mutationFn(params);
      setState({ isLoading: false, error: null, data });
      return data;
    } catch (error) {
      const errorObj =
        error instanceof Error ? error : new Error(String(error));
      setState({ isLoading: false, error: errorObj, data: null });
      throw errorObj;
    }
  };

  return {
    ...state,
    mutate,
  };
}
