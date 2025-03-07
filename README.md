# Magi Store - E-commerce Platform for Makeup Store

## Project Overview
Magi Store is a comprehensive e-commerce platform for a makeup and beauty products store. The application features product management, inventory tracking, order processing, customer management, and an admin dashboard.

## Tech Stack
- Frontend: React, TypeScript, Tailwind CSS, ShadCN UI
- Backend: Supabase (PostgreSQL, Authentication, Storage)
- State Management: React Context API
- Routing: React Router

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Setup

1. Clone the repository
```bash
git clone <repository-url>
cd magi-store
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Copy the `.env.example` file to `.env.local` and fill in your Supabase credentials:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase URL and anon key:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_TEMPO=true
```

4. Set up Supabase
- Create a new Supabase project
- Run the migration scripts in the `supabase/migrations` folder to set up your database schema
- The migrations will also seed your database with initial data

5. Start the development server
```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   │   ├── admin/      # Admin dashboard components
│   │   ├── cart/       # Shopping cart components
│   │   ├── home/       # Homepage components
│   │   ├── layout/     # Layout components
│   │   ├── product/    # Product components
│   │   └── ui/         # UI components (ShadCN)
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and libraries
│   ├── services/       # API service functions
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main App component
│   └── main.tsx        # Entry point
├── supabase/
│   └── migrations/     # Database migration scripts
├── .env.example        # Example environment variables
└── README.md           # Project documentation
```

## Features

### Customer-facing
- Product browsing and filtering
- Product details with images, descriptions, and reviews
- Shopping cart functionality
- User account management

### Admin Dashboard
- Product management (CRUD operations)
- Inventory management
- Order processing and tracking
- Customer management
- Sales analytics

## Database Schema

The database includes the following tables:
- products
- categories
- subcategories
- brands
- customers
- orders
- order_items
- reviews
- admin_users

See the migration scripts for detailed schema information.

## Authentication

The application uses Supabase Authentication for user management. There are two types of users:
- Regular customers (for the storefront)
- Admin users (for the admin dashboard)

Admin access is controlled through the `admin_users` table.
