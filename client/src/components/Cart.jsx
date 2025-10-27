"use client"

import { useState } from "react"
import CartItem from "./CartItem"
import CheckoutForm from "./CheckoutForm"

function Cart({ items, onRemove, onCheckout, onBack }) {
  const [showCheckout, setShowCheckout] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0 && !showCheckout) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your cart is empty</h2>
        <button
          onClick={onBack}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div>
      {showCheckout ? (
        <CheckoutForm items={items} total={total} onCheckout={onCheckout} onBack={() => setShowCheckout(false)} />
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <CartItem key={item.id} item={item} onRemove={onRemove} />
            ))}
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 max-w-md ml-auto">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping:</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onBack}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 rounded-lg transition"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => setShowCheckout(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
