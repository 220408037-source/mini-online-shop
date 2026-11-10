
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
        />
        <h3>{product.title}</h3>
      </Link>

      <p className="product-category">
        {product.category}
      </p>

      <strong>${product.price.toFixed(2)}</strong>
    </article>
  )
}

export default ProductCard
