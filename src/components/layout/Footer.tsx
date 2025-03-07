import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Sobre Nós
            </h3>
            <p className="text-gray-600">
              Magi é sua loja de maquiagem premium com produtos de alta
              qualidade para realçar sua beleza natural.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">
                  Rua da Beleza, 123 - São Paulo
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">(11) 99999-9999</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">contato@magistore.com</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Categorias
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/category/face"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Rosto
                </Link>
              </li>
              <li>
                <Link
                  to="/category/eyes"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Olhos
                </Link>
              </li>
              <li>
                <Link
                  to="/category/lips"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Lábios
                </Link>
              </li>
              <li>
                <Link
                  to="/category/skincare"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Skincare
                </Link>
              </li>
              <li>
                <Link
                  to="/category/brushes"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Pincéis
                </Link>
              </li>
              <li>
                <Link
                  to="/category/sets"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Kits
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ajuda</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-pink-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Envio
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Devoluções
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Privacidade
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-pink-600">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Newsletter
            </h3>
            <p className="text-gray-600 mb-2">
              Receba novidades e promoções exclusivas.
            </p>
            <div className="flex">
              <Input
                placeholder="Seu email"
                className="rounded-l-md border-r-0"
              />
              <Button className="rounded-l-none bg-pink-600 hover:bg-pink-700">
                Assinar
              </Button>
            </div>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-600">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Magi Store. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
