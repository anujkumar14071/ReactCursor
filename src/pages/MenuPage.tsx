import type { FC } from 'react'
import { Link } from 'react-router-dom'

type MenuPageProps = {
  isLoggedIn: boolean
  cartCount: number
}

export const MenuPage: FC<MenuPageProps> = ({ isLoggedIn, cartCount }) => {
  return (
    <div className="page page-menu">
      <header className="page-header">
        <h1>Main Menu</h1>
        <p>Quick links to the main sections of the app.</p>
      </header>

      <nav className="menu-grid">
        <Link to="/products" className="menu-card">
          <h2>Products</h2>
          <p>Browse items and add them to your cart.</p>
        </Link>
        <Link to="/cart" className="menu-card">
          <h2>Cart</h2>
          <p>
            View your cart ({cartCount} {cartCount === 1 ? 'item' : 'items'}).
          </p>
        </Link>
        <Link to="/login" className="menu-card">
          <h2>{isLoggedIn ? 'Account' : 'Login'}</h2>
          <p>
            {isLoggedIn
              ? 'You are logged in. View your account.'
              : 'Sign in to save your cart.'}
          </p>
        </Link>
      </nav>
    </div>
  )
}

export default MenuPage

