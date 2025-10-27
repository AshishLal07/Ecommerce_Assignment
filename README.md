# E-Commerce Cart App - Setup Instructions

This is a full-stack e-commerce application with a Node.js/Express backend and React frontend.

## Project Structure

\`\`\`
ecommerce-app/
├── backend/
│ ├── server.js
│ ├── package.json
│ └── ecommerce.db (created automatically)
└── frontend/
├── src/
│ ├── components/
│ │ ├── ProductGrid.jsx
│ │ ├── ProductCard.jsx
│ │ ├── Cart.jsx
│ │ ├── CartItem.jsx
│ │ └── CheckoutForm.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── public/
│ └── (product images)
├── package.json
├── vite.config.js
└── index.html
\`\`\`

## Installation & Running

### 1. Backend Setup

\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

The backend server will start on `http://localhost:5000`

### 2. Frontend Setup (in a new terminal)

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

The frontend will open at `http://localhost:3000`

## Features

- **Product Catalog**: Browse 8 different tech accessories
- **Shopping Cart**: Add/remove items with quantity control
- **Checkout**: Enter name and email to complete purchase
- **Order Confirmation**: Get order ID after successful checkout
- **Responsive Design**: Works on desktop and mobile devices

## API Endpoints

### Products

- `GET /api/products` - Get all products

### Cart

- `GET /api/cart` - Get cart items and total
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/:id` - Remove item from cart

### Checkout

- `POST /api/checkout` - Process checkout and clear cart

## Database

The app uses SQLite with two tables:

- **products**: Stores product information
- **cart**: Stores cart items with product references

Database is automatically created and seeded on first run.

## Technologies Used

**Backend:**

- Node.js
- Express.js
- SQLite3
- CORS

**Frontend:**

- React 18
- Vite
- Axios
- CSS3

## Notes

- Make sure both backend and frontend are running for the app to work
- The backend runs on port 5000, frontend on port 3000
- CORS is enabled to allow frontend-backend communication
- Cart data persists in the SQLite database
