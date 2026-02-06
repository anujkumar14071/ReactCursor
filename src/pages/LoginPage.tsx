import type { FC, FormEvent } from 'react'
import { useState } from 'react'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../authConfig'

type LoginPageProps = {
  onLogin: (email: string) => void
}

export const LoginPage: FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { instance } = useMsal()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }
    setError('')
    onLogin(email)
  }

  return (
    <div className="page page-login">
      <header className="page-header">
        <h1>Login</h1>
        <p>Sign in with email or your Microsoft account.</p>
      </header>

      <form className="card form-card" onSubmit={handleSubmit}>
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="primary-button">
          Continue
        </button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <button
          type="button"
          className="secondary-button"
          onClick={() => instance.loginRedirect(loginRequest)}
        >
          Sign in with Microsoft
        </button>
      </div>
    </div>
  )
}

export default LoginPage

