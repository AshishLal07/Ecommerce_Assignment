"use client"

import { useState } from "react"

function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity)
    setQuantity(1)
  }

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <div className="aspect-square overflow-hidden bg-gray-200">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
          <div className="flex items-center gap-2 border border-gray-300 rounded">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
              min="1"
              className="w-10 text-center border-0 outline-none"
            />
            <button onClick={() => setQuantity(quantity + 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100">
              +
            </button>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
