import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const login = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password)
        navigate('/articles')
        } catch (error) {
          setError(error.message)
        }
  }

  return (
    <>
    <h1>LoginPage</h1>
    {error && <p className='error'>{error}</p>}
    <input 
      placeholder='Email'
      type="email" 
      value={email} 
      onChange={(e) => setEmail(e.target.value)}
    />
    <input 
      placeholder='Password'
      type="password" 
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button onClick={login}>Login</button>
    <Link to="/create-account">{' '}Not registered? Create account</Link>
    </>
  )
}

