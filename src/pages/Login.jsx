import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import { supabase } from '../superbaseClient'
import './Login.css'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('login') // 'login' or 'signup'
  const [status, setStatus] = useState('form') // form | loading | success | error
  const [message, setMessage] = useState('')
  const [userEmail, setUserEmail] = useState('')

  // If already logged in, show that instead of the form
  




  function handleTryAgain() {
    setStatus('form')
    setMessage('')
    setPassword('')
  }

  async function handleLogout() {

  }

  // ---- Success screen ----
  if (status === 'success') {
    return (
      <div className="login">
        <h1>Logged in</h1>
        <p className="login-result login-result-success">
          {message}
        </p>
        {userEmail && (
          <p className="login-note">Signed in as {userEmail}</p>
        )}
        <div className="login-actions">
          <Link to="/works" className="btn btn-gold">
            Go to Works
          </Link>
          <Link to="/works/new" className="btn btn-dark">
            Add a work
          </Link>
          <button type="button" className="login-switch" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    )
  }

  // ---- Error screen ----
  if (status === 'error') {
    return (
      <div className="login">
        <h1>Login failed</h1>
        <p className="login-result login-result-error">
          {message}
        </p>
        <div className="login-actions">
          <button
            type="button"
            className="btn btn-gold"
            onClick={handleTryAgain}
          >
            Try again
          </button>
          <Link to="/" className="login-switch">
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  // ---- Form (and loading) ----
  return (
    <div className="login">
      <h1>{mode === 'login' ? 'Log in' : 'Create account'}</h1>
      <p className="login-note">
        Only signed-in users can add new works.
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            disabled={status === 'loading'}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            disabled={status === 'loading'}
          />
        </label>

        <button
          className="btn btn-gold"
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading'
            ? 'Please wait…'
            : mode === 'login'
              ? 'Log in'
              : 'Sign up'}
        </button>
      </form>

      <button
        type="button"
        className="login-switch"
        onClick={() => {
          setMode(mode === 'login' ? 'signup' : 'login')
          setMessage('')
        }}
        disabled={status === 'loading'}
      >
        {mode === 'login'
          ? 'Need an account? Sign up'
          : 'Already have an account? Log in'}
      </button>
    </div>
  )
}

export default Login