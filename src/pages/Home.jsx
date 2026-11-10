
import { Link } from 'react-router-dom'
import { fetchProducts } from '../api/productsApi'
import useFetch from '../hooks/useFetch'
import ProductCard from '../components/ProductCard'

function Home() {
  const { loading, error, data } = useFetch(fetchProducts)

  const featuredProducts = data ? data.slice(0, 4) : []

  return (
    <section className="home-page">
      <div className="hero">
        <p className="hero-label">WELCOME TO MINI SHOP</p>
        <h2>Find Your Favorites</h2>
        <p>
          Discover amazing products and enjoy a simple,
          comfortable shopping experience.
        </p>
        <Link to="/products" className="hero-button">
          Explore Products
        </Link>
      </div>

      <div className="featured-section">
        <h2>Featured Products</h2>
        <p>Some of our favorite picks for you.</p>

        {loading && <p>Loading products...</p>}
        {error && <p>Error: {error}</p>}

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Link to="/products" className="view-all-link">
          View All Products →
        </Link>
      </div>

      <div className="benefits">
        <div>
          <h3>Easy Shopping</h3>
          <p>Find what you need with ease.</p>
        </div>
        <div>
          <h3>Great Products</h3>
          <p>Explore a wide range of products.</p>
        </div>
        <div>
          <h3>Simple Experience</h3>
          <p>Enjoy a smooth shopping journey.</p>
        </div>
      </div>
    </section>
  )
}

export default Home
