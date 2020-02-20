import React from 'react'
import router from './router'
import List from './List.js'
import './App.css'

function App () {
  const listId = router.getListId()
  return (
    <div className='App'>
      <List listId={listId} />
    </div>
  )
}

export default App
