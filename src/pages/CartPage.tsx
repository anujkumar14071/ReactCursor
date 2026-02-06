import type { FC } from 'react'
import type { Product } from './ProductPage'

export type CartItem = Product & { quantity: number }

type CartPageProps = {
  items: CartItem[]
  onUpdateQuantity: (id: number, quantity: number) => void
  onClearCart: () => void
}

export const CartPage: FC<CartPageProps> = ({
  items,
  onUpdateQuantity,
  onClearCart,
}) => {
  const hasItems = items.length > 0
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  return (
    <div className="page page-cart">
      <header className="page-header">
        <h1>Your Cart</h1>
        <p>Review your selected items before checkout.</p>
      </header>

      {!hasItems && (
        <p className="empty-state">
          Your cart is empty. Browse products and add something you like.
        </p>
      )}

      {hasItems && (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-main">
                  <h2>{item.title}</h2>
                  <p className="cart-item-description">{item.description}</p>
                </div>
                <div className="cart-item-meta">
                  <span className="cart-item-price">
                    ${item.price.toFixed(2)}
                  </span>
                  <label className="cart-item-quantity">
                    Qty:
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        onUpdateQuantity(item.id, Number(e.target.value) || 1)
                      }
                    />
                  </label>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <div className="cart-summary-row">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <div className="cart-actions">
              <button className="secondary-button" onClick={onClearCart}>
                Clear cart
              </button>
              <button className="primary-button" disabled={!hasItems}>
                Checkout (demo)
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage

