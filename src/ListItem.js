import React, { useState } from 'react'

export default () => {
  const [done, setDone] = useState(false)
  const [body, setBody] = useState('')

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
    <div className='ListItem'>
      <input
        className='ListItem-check'
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
