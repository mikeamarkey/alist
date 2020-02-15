import React, { useState } from 'react'
import './ListItem.css'

export default ({ listItem, handleDone, handleRemove }) => {
  const [body, setBody] = useState(listItem.body)

  const updateBody = () => {
    console.log('updating body')
    // TODO: debounce updating instead of blur?
    // updateDatabase
  }

  return (
    <div className={`ListItem${listItem.done ? ' done' : ''}`}>
      <input
        className='ListItem-done'
        type='checkbox'
        name='done'
        checked={listItem.done}
        onChange={() => handleDone(listItem)}
      />
      <input
        className='ListItem-body'
        type='text'
        name='body'
        placeholder='I want to...'
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onBlur={updateBody}
      />
      <button
        className='ListItem-remove'
        type='button'
        name='remove'
        onClick={() => handleRemove(listItem)}
      >-
      </button>
    </div>
  )
}
