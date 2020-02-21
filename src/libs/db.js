import firebase from './firebase'
const db = firebase.firestore()

const list = {
  get: async (listId) => {
    const itemSS = await db.collection('items')
      .where('listId', '==', listId)
      .get()
    const items = itemSS.docs.map((item) => {
      return {
        id: item.id,
        ...item.data()
      }
    })

    const listSS = await db.collection('lists').doc(listId).get()
    const id = listSS.id
    const data = listSS.data()
    return { id, ...data, items }
  },
  update: (data) => {
    db.collection('lists').doc(data.listId).set(data, { merge: true })
  }
}

const item = {
  initNew: () => {
    return db.collection('items').doc()
  },
  update: (data) => {
    db.collection('items').doc(data.id).set(data, { merge: true })
  },
  remove: (data) => {
    db.collection('items').doc(data.id).delete()
  }
}

export default { list, item }
