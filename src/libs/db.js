import * as firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
}

if (firebase.apps.length <= 0) {
  firebase.initializeApp(firebaseConfig)
}

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
