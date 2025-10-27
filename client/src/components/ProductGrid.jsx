import ProductCard from "./ProductCard"

function ProductGrid({ products, onAddToCart }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid
