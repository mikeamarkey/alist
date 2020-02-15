import React, { useState } from 'react'
import ListItem from './ListItem'
import './List.css'

export default () => {
  const list = {
    title: 'スーパー',
    items: [
      { id: 1, done: false, body: 'アップル' },
      { id: 2, done: true, body: 'バナナ' },
      { id: 3, done: false, body: '納豆' }
    ]
  }

  const sortListItems = (items) => {
    return items.sort((a, b) => {
      if (a.done && !b.done) {
        return 1
      } else if (!a.done && b.done) {
        return -1
      } else {
        return 0
      }
    })
  }
  const [listItems, setListItems] = useState(sortListItems(list.items))
  const [title, setTitle] = useState(list.title)

  const updateTitle = () => {
    console.log('updating title')
    // TODO: debounce updating instead of blur?
    // updateDatabase
  }

  const handleAdd = () => {
    const newItem = {
      id: Math.floor(Math.random() * 10000),
      done: false,
      body: ''
    }
    const items = [...listItems, newItem]
    setListItems(sortListItems(items))
  }

  const events = {
    handleDone: (listItem) => {
      const items = listItems.map((item) => {
        if (listItem.id !== item.id) {
          return item
        }
        item.done = !listItem.done
        return item
      })
      setListItems(sortListItems(items))
    },
    handleRemove: (listItem) => {
      const items = listItems.filter((item) => {
        return listItem.id !== item.id
      })
      setListItems(items)
    }
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
        {listItems.map((listItem) => {
          return (
            <ListItem key={listItem.id} listItem={listItem} {...events} />
          )
        })}
      </div>

      <button
        className='ListAdd'
        type='button'
        name='list-add'
        onClick={handleAdd}
      >+
      </button>
    </div>
  )
}
