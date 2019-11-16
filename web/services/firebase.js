import * as firebase from 'firebase/app'
import 'firebase/auth'
import { clearLoggedInStatus } from './login.js'

export const initFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyBchWNVQsL7YEcTtf369PYTP-DLTiB7Vac',
    projectId: 'copenhagenjsdk'
  }
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
}

export const logoutFirebase = () => {
  firebase
    .auth()
    .signOut()
    .then(function() {
      console.log('signed out')
      clearLoggedInStatus()
      redirectToLogin()
    })
    .catch(function(error) {
      console.log('Sign out error', error)
    })
}

export const redirectToLogin = () => {
  window.location = '/login'
}

export const firebaseLogin = () => {
  return new Promise((resolve, reject) => {
    initFirebase()
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        user.getIdToken().then(function(idToken) {
          resolve(idToken)
        })
      } else {
        reject(new Error('no user'))
      }
    })
  })
}
