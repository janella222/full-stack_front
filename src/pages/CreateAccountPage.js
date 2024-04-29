import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const CreateAccountPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const createAccount = async () => {
        try {
          if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
          }
          await createUserWithEmailAndPassword(getAuth(), email, password)
          navigate('/articles')
            } catch (error) {
                setError(error.message)
            }
        }

    return (
      <>
      <h1>Create account</h1>
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
       <input 
        placeholder='Confirm Password'
        type="password" 
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={createAccount}>Create Account</button>
      <Link to="/login">{' '}Already registered? Login</Link>
      </>
    )
    }

export default CreateAccountPage;