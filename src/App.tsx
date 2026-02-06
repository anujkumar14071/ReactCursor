import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useMsal } from '@azure/msal-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import './App.css'
import type { CartItem } from './pages/CartPage'
import type { Product } from './pages/ProductPage'

export function AppLayout() {
  const activeClassName = 'nav-link active'
  const inactiveClassName = 'nav-link'
  const { accounts, instance } = useMsal()
  const activeAccount = accounts[0]
  const displayName = activeAccount?.name || activeAccount?.username

  return (
    <div className="app-shell">
      <header className="top-bar">
        <Link to="/" className="brand">
          <span className="brand-dot" />
          React Shop
        </Link>
        <div className="top-bar-right">
          <nav className="main-nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeClassName : inactiveClassName
              }
              end
            >
              Menu
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? activeClassName : inactiveClassName
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? activeClassName : inactiveClassName
              }
            >
              Cart
            </NavLink>
            {activeAccount ? (
              <button
                type="button"
                className="nav-link nav-link-button"
                onClick={() => instance.logoutRedirect()}
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                }
              >
                Login
              </NavLink>
            )}
          </nav>
          {displayName && (
            <div className="user-pill" title={activeAccount?.username}>
              <span className="user-pill-avatar">
                {displayName.charAt(0).toUpperCase()}
              </span>
              <span className="user-pill-name">{displayName}</span>
            </div>
          )}
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <small>Demo e‑commerce app 2026</small>
      </footer>
    </div>
  )
}

function App({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [userEmail, setUserEmail] = useState<string | null>(null)

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  )

  const handleAddToCart = (product: Product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...current, { ...product, quantity: 1 }]
    })
  }

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    )
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  const handleLogin = (email: string) => {
    setUserEmail(email)
  }

  return (
    <AppContext.Provider
      value={{
        cartItems,
        cartCount,
        userEmail,
        handleAddToCart,
        handleUpdateQuantity,
        handleClearCart,
        handleLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

type AppContextValue = {
  cartItems: CartItem[]
  cartCount: number
  userEmail: string | null
  handleAddToCart: (product: Product) => void
  handleUpdateQuantity: (id: number, quantity: number) => void
  handleClearCart: () => void
  handleLogin: (email: string) => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export const useAppContext = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within App provider')
  return ctx
}

export default App
