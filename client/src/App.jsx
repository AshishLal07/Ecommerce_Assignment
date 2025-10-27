import { useState, useEffect } from "react";
import axios from "axios";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import TransactionModal from "./components/TransactionModal";

const API_URL = "http://localhost:5000/api";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionState, setTransactionState] = useState("");
  const [transactionMessage, setTransactionMessage] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart`);
      setCart(response.data.items);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await axios.post(`${API_URL}/cart`, { productId, qty: quantity });
      fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`${API_URL}/cart/${cartItemId}`);
      fetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handleCheckout = async (name, email) => {
    try {
      const response = await axios.post(`${API_URL}/checkout`, {
        cartItems: cart,
        name,
        email,
      });
      setShowTransactionModal(true);
      setTransactionState("success");
      setTransactionMessage(response.data.orderId);
      setCart([]);
      setShowCart(false);
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">E-Commerce Store</h1>
          <button
            onClick={() => setShowCart(!showCart)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Cart ({cart.length})
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {showCart ? (
          <Cart
            items={cart}
            onRemove={removeFromCart}
            onCheckout={handleCheckout}
            onBack={() => setShowCart(false)}
          />
        ) : (
          <>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <p className="text-lg text-gray-600">Loading products...</p>
              </div>
            ) : (
              <ProductGrid products={products} onAddToCart={addToCart} />
            )}
          </>
        )}
      </main>

      {showTransactionModal && (
        <TransactionModal
          isOpen={showTransactionModal}
          status={transactionState}
          onClose={() => setShowTransactionModal(false)}
          message={transactionMessage}
        ></TransactionModal>
      )}
    </div>
  );
}

export default App;
