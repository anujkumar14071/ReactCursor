import type { FC } from 'react'
import { useEffect, useState } from 'react'

export type Product = {
  id: number
  title: string
  description: string
  price: number
  thumbnail?: string
  category?: string
}

type ProductPageProps = {
  onAddToCart: (product: Product) => void
}

type DummyJsonResponse = {
  products: Product[]
}

export const ProductPage: FC<ProductPageProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('https://dummyjson.com/products?limit=12')
        if (!response.ok) {
          throw new Error('Failed to load products')
        }
        const data: DummyJsonResponse = await response.json()
        setProducts(data.products)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="page page-products">
      <header className="page-header">
        <h1>Product</h1>
        <p>Browse products from DummyJSON and add them to your cart.</p>
      </header>

      {loading && <p>Loading products...</p>}
      {error && <p className="form-error">{error}</p>}

      {!loading && !error && (
        <div className="product-grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              {product.thumbnail && (
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={{
                    width: '100%',
                    borderRadius: '0.75rem',
                    marginBottom: '0.6rem',
                    objectFit: 'cover',
                    maxHeight: '180px',
                  }}
                />
              )}
              <div className="product-card-header">
                <h2>{product.title}</h2>
                <span className="product-price">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              {product.category && (
                <span className="product-category">{product.category}</span>
              )}
              <p className="product-description">{product.description}</p>
              <button
                className="primary-button"
                onClick={() => onAddToCart(product)}
              >
                Add to cart
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductPage

