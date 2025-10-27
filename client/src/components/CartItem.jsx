"use client"

function CartItem({ item, onRemove }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
      <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">{item.name}</h4>
        <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="ml-4 px-3 py-1 bg-red-100 text-red-600 hover:bg-red-200 rounded font-medium transition"
      >
        Remove
      </button>
    </div>
  )
}

export default CartItem
