
import { useParams, useNavigate, Link } from 'react-router-dom'
import { fetchProduct } from '../api/productsApi'
import useFetch from '../hooks/useFetch'
import { useCartStore } from '../store/cartStore'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const addItem = useCartStore((state) => state.addItem)

  const {
    loading,
    error,
    data: product,
  } = useFetch(fetchProduct, id)

  if (loading) {
    return <p>Loading product...</p>
  }

  if (error) {
    return (
      <section className="page">
        <h2>Product Not Found</h2>
        <p>{error}</p>
        <Link to="/products">Back to Products</Link>
      </section>
    )
  }

  return (
    <section className="product-detail">
      <button onClick={() => navigate('/products')}>
        ← Back to Products
      </button>

      <div className="detail-content">
        <img src={product.thumbnail} alt={product.title} />

        <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Category: {product.category}</p>
          <h3>${product.price.toFixed(2)}</h3>

          <button onClick={() => addItem(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
