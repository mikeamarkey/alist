import React, { useEffect, useState } from 'react'
import ListItem from './ListItem'
import './List.css'
import db from './db'

export default () => {
  const sortListItems = (items) => {
    const rankSorted = items.sort((a, b) => {
      if (a.rank > b.rank) {
        return 1
      } else if (b.rank > a.rank) {
        return -1
      } else {
        return 0
      }
    })

    const doneSorted = rankSorted.sort((a, b) => {
      if (a.done && !b.done) {
        return 1
      } else if (!a.done && b.done) {
        return -1
      } else {
        return 0
      }
    })

    return doneSorted
  }

  const [title, setTitle] = useState('')
  const [listItems, setListItems] = useState([])

  // set initial
  useEffect(() => {
    const getList = async () => {
      const list = await db.list.get()
      setTitle(list.title ? list.title : '')
      setListItems(sortListItems(list.items ? list.items : []))
    }
    getList()
  }, [])

  const updateTitle = () => {
    db.list.update({ title })
  }

  const handleAdd = () => {
    const newItem = {
      id: db.item.initNew().id,
      done: false,
      body: '',
      rank: listItems.reduce((ret, item) => {
        if (item.rank >= ret) {
          ret = item.rank + 1
        }
        return ret
      }, 1)
    }
    const items = [...listItems, newItem]
    setListItems(sortListItems(items))
    db.item.update(newItem)
  }

  const events = {
    handleDone: (listItem) => {
      const items = listItems.map((item) => {
        if (listItem.id !== item.id) {
          return item
        }
        item.done = !listItem.done
        db.item.update(item)
        return item
      })
      setListItems(sortListItems(items))
    },
    handleRemove: (listItem) => {
      db.item.remove(listItem)
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
