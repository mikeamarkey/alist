import React, { useState } from 'react'
import ListItem from './ListItem'

export default () => {
  const [title, setTitle] = useState('')

  const updateTitle = () => {
    console.log('updating title')
    // TODO: debounce updating instead of blur?
    // updateDatabase
  }

  return (
    <div className='List'>
      <input
        className='ListTitle'
        type='text'
        name='list-title'
        value={title}
        placeholder='Title'
        onChange={(e) => setTitle(e.target.value)}
        onBlur={updateTitle}
      />

      <div className='List-wrapper'>
        <ListItem />
        <ListItem />
        <ListItem />
      </div>
    </div>
  )
}
