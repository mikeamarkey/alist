import firebase from './firebase'
const auth = firebase.auth

const onChange = (setUser, setLoading) => {
  return auth().onAuthStateChanged((user) => {
    setUser(user)
    setLoading(false)
  })
}

const signup = (email, password) => {
  auth().createUserWithEmailAndPassword(email, password)
}

const login = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password)
}

const signout = (user) => {
  auth().signOut()
}

const currentUser = () => {
  return auth().currentUser
}

export default {
  onChange, signup, login, signout, currentUser
}
