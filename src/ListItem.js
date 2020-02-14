import React, { useState } from 'react'
import './ListItem.css'

export default ({ listItem }) => {
  const [done, setDone] = useState(listItem.done)
  const [body, setBody] = useState(listItem.body)

  const updateDone = () => {
    console.log('updating done')
    setDone(!done)
    // updateDatabase
  }

  const updateBody = () => {
    console.log('updating body')
    // TODO: debounce updating instead of blur?
    // updateDatabase
  }

  return (
    <div className={`ListItem ${done && 'done'}`}>
      <input
        className='ListItem-done'
        type='checkbox'
        name='done'
        checked={done}
        onChange={updateDone}
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
    </div>
  )
}
