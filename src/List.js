import React, { useState } from 'react'
import ListItem from './ListItem'
import './List.css'

export default () => {
  const listItems = [
    { id: 1, done: false, body: 'this is a cool one' },
    { id: 2, done: true, body: 'this is a done one' },
    { id: 3, done: false, body: 'hey hey hey buddy' }
  ]
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
        {listItems.map((listItem) => <ListItem key={listItem.id} listItem={listItem} />)}
      </div>
    </div>
  )
}
