import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import Page from '../components/Page'
import { initFirebase } from '../services/firebase.js'
import { setLoggedInStatus } from '../services/login.js'

function finishLogin(setStatus) {
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    var email = window.localStorage.getItem('emailForSignIn')
    if (!email) {
      return alert(
        'Open this URL in browser to login - This browser is probrably a in-app browser.'
      )
    }
    firebase
      .auth()
      .signInWithEmailLink(email, window.location.href)
      .then(async result => {
        console.log(result)
        setStatus('Successful login!')
        setLoggedInStatus()
        window.localStorage.removeItem('emailForSignIn')
        window.location.href = '/profile'
      })
      .catch(error => {
        setStatus('Error logging in! See console.')
        console.log('error', error)
      })
  }
}

export default () => {
  const [status, setStatus] = useState('Loading...')
  useEffect(() => {
    initFirebase()
    finishLogin(setStatus)
  }, [])
  return (
    <Page>
      <h1>Logging you in, please wait!</h1>
      <p>{status}</p>
    </Page>
  )
}
