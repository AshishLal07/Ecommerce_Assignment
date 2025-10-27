"use client"

import { useState } from "react"

function CheckoutForm({ items, total, onCheckout, onBack }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email) {
      alert("Please fill in all fields")
      return
    }
    setLoading(true)
    await onCheckout(name, email)
    setLoading(false)
    setName("")
    setEmail("")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-gray-700">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between text-lg font-bold text-gray-900">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onBack}
              disabled={loading}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 rounded-lg transition disabled:opacity-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckoutForm
