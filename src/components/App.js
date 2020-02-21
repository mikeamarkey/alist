import React, { useState, useEffect } from 'react'
import auth from '../libs/auth'
import Auth from './Auth.js'
import List from './List.js'
import './App.css'

function App () {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    auth.onChange(setUser, setIsLoading)
  }, [])

  if (isLoading) {
    return <div />
  }

  if (!user) {
    return (
      <div className='App'>
        <Auth />
      </div>
    )
  } else {
    return (
      <div className='App'>
        <div className='logout'>
          <button
            onClick={() => auth.signout()}
          >ログアウト
          </button>
        </div>
        <List />
      </div>
    )
  }
}

export default App
