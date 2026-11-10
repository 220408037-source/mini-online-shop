
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchProducts } from '../api/productsApi'
import useFetch from '../hooks/useFetch'
import ProductCard from '../components/ProductCard'

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''

  const { loading, error, data } = useFetch(fetchProducts)

  const categories = useMemo(() => {
    if (!data) return []

    return [...new Set(data.map((product) => product.category))]
  }, [data])

  const filteredProducts = useMemo(() => {
    if (!data) return []

    return data.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesCategory =
        !category || product.category === category

      return matchesSearch && matchesCategory
    })
  }, [data, search, category])

  function updateFilter(key, value) {
    const nextParams = new URLSearchParams(searchParams)

    if (value) {
      nextParams.set(key, value)
    } else {
      nextParams.delete(key)
    }

    setSearchParams(nextParams)
  }

  if (loading) return <p>Loading products...</p>

  if (error) return <p>Error: {error}</p>

  return (
    <section className="products-page">
      <h2>Our Products</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => updateFilter('q', e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => updateFilter('category', e.target.value)}
        >
          <option value="">All Categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductList
