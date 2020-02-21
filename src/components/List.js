import React, { useEffect, useState } from 'react'
import ListItem from './ListItem'
import './List.css'
import db from '../libs/db'
import utils from '../libs/utils'

export default () => {
  const lists = [
    { name: 'スーパー', listId: 'test' },
    { name: 'やること', listId: 'todo' },
    { name: '利音グッズ', listId: 'leo' }
  ]
  const initialListId = utils.getInitialId()

  const initialList = lists.find((item) => {
    return item.listId === initialListId
  })

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

    const doneDivided = rankSorted.reduce((acc, item) => {
      if (!item.done) {
        acc.active.push(item)
      } else {
        acc.done.push(item)
      }
      return acc
    }, { active: [], done: [] })

    return doneDivided
  }

  const [listId, setListId] = useState(initialListId)
  const [title, setTitle] = useState(initialList ? initialList.name : '')
  const [listItems, setListItems] = useState({ active: [], done: [] })

  // set initial
  useEffect(() => {
    const getList = async () => {
      const list = await db.list.get(listId)
      setTitle(list.title ? list.title : '')
      setListItems(sortListItems(list.items ? list.items : []))
    }
    getList()
  }, [listId])

  const updateTitle = (e) => {
    db.list.update({ title, listId })
  }

  const changeListId = (listId) => {
    window.history.pushState(null, null, listId)
    setListId(listId)
  }

  const handleAdd = () => {
    const items = [...listItems.active, ...listItems.done]
    const newItem = {
      listId,
      id: db.item.initNew().id,
      done: false,
      body: '',
      rank: items.reduce((ret, item) => {
        if (item.rank >= ret) {
          ret = item.rank + 1
        }
        return ret
      }, 1)
    }
    items.push(newItem)
    setListItems(sortListItems(items))
    db.item.update(newItem)
  }

  const events = {
    handleDone: (listItem) => {
      if (!listItem.done && listItem.body.length <= 0) {
        return events.handleRemove(listItem)
      }

      const items = [...listItems.active, ...listItems.done]
      const filtered = items.map((item) => {
        if (listItem.id !== item.id) {
          return item
        }
        listItem.done = !listItem.done
        db.item.update(listItem)
        return listItem
      })
      setListItems(sortListItems(filtered))
    },
    handleRemove: (listItem) => {
      db.item.remove(listItem)
      const items = [...listItems.active, ...listItems.done]
      const filtered = items.filter((item) => {
        return listItem.id !== item.id
      })
      setListItems(sortListItems(filtered))
    }
  }

  return (
    <div className='List'>
      <div className='mylists'>
        {lists.map((item) => {
          return (
            <button
              className={`mylist ${listId === item.listId ? 'active' : ''}`}
              key={item.listId}
              onClick={() => changeListId(item.listId)}
            >{item.name}
            </button>
          )
        })}
      </div>

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
        {listItems.active.map((listItem) => {
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

      <hr className='separator' />

      <div className='List-wrapper'>
        <div className='subhead'>終了したアイテム</div>
        {listItems.done.map((listItem) => {
          return (
            <ListItem key={listItem.id} listItem={listItem} {...events} />
          )
        })}
      </div>

    </div>
  )
}
