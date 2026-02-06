import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { PublicClientApplication, InteractionType } from '@azure/msal-browser'
import { MsalAuthenticationTemplate, MsalProvider } from '@azure/msal-react'
import './index.css'
import AppProvider, { AppLayout, useAppContext } from './App.tsx'
import { ProductPage } from './pages/ProductPage'
import { CartPage } from './pages/CartPage'
import { LoginPage } from './pages/LoginPage'
import { MenuPage } from './pages/MenuPage'
import { loginRequest, msalConfig } from './authConfig'

const pca = new PublicClientApplication(msalConfig)

const AppRoutes = () => {
  const {
    cartItems,
    cartCount,
    userEmail,
    handleAddToCart,
    handleUpdateQuantity,
    handleClearCart,
    handleLogin,
  } = useAppContext()

  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Public login route */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        {/* All other routes protected by Azure login */}
        <Route
          element={
            <MsalAuthenticationTemplate
              interactionType={InteractionType.Redirect}
              authenticationRequest={loginRequest}
            >
              <Outlet />
            </MsalAuthenticationTemplate>
          }
        >
          <Route
            path="/"
            element={<MenuPage isLoggedIn={!!userEmail} cartCount={cartCount} />}
          />
          <Route
            path="/products"
            element={<ProductPage onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/cart"
            element={
              <CartPage
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onClearCart={handleClearCart}
              />
            }
          />
        </Route>
      </Route>
    </Routes>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MsalProvider instance={pca}>
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </MsalProvider>
  </StrictMode>,
)
