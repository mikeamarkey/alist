import React, { useState } from 'react'
import auth from '../libs/auth'
import './Auth.css'

export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hasError, setHasError] = useState(false)

  const onSubmit = () => {
    auth.login(email, password)
      .then(() => {
        setHasError(false)
      })
      .catch(() => {
        setHasError(true)
      })
  }

  const checkKeyDown = (e) => {
    if (e.keyCode === 13) {
      return onSubmit()
    }
  }

  return (
    <div className='Auth'>
      <form>
        <input
          name='email'
          type='email'
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={checkKeyDown}
        />

        <input
          name='password'
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={checkKeyDown}
        />

        <button
          type='button'
          value='ログイン／サインアップ'
          onClick={onSubmit}
        >
          ログイン／サインアップ
        </button>

        {hasError && (
          <div className='errorMessage'>emailとpasswordを確認してください</div>
        )}
      </form>
    </div>
  )
}
