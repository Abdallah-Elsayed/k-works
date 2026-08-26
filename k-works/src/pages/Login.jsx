import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../superbaseClient'
import './Login.css'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mode, setMode] = useState('login') // keeping it only login
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event){
        const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Logged in.')
        navigate('/works')
      }
      setLoading(false)
    }
    return (
    <div className="login">
      <h1>{mode === 'login' ? 'Log in' : 'Create account'}</h1>
      <p className="login-note">
        Only signed-in users will be able to add new works.
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
          />
        </label>

        <button className="btn btn-gold" type="submit" disabled={loading}>
          {loading
            ? 'Please wait…'
            : mode === 'login'
              ? 'Log in'
              : 'Sign up'}
        </button>
      </form>

      {message && <p className="login-message">{message}</p>}

      <button
        type="button"
        className="login-switch"
        onClick={() => {
          setMode(mode === 'login' ? 'signup' : 'login')
          setMessage('')
        }}
      >
        {mode === 'login'
          ? 'Need an account? Sign up'
          : 'Already have an account? Log in'}
      </button>
    </div>
  )
}
export default Login