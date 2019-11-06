import * as firebase from 'firebase/app'
import 'firebase/auth'
import React from 'react'
import Head from 'next/head'
import Page from '../components/Page'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { initFirebase } from '../services/firebase.js'

export default class Videos extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      status: ''
    }
    initFirebase()
    console.log(typeof window, typeof window !== 'undefined')
    if (typeof window !== 'undefined') {
      this.finishLogin()
    }
  }
  handleLogin() {
    var actionCodeSettings = {
      url: window.location.origin + window.location.pathname,
      // url: 'https://copenhagenjs.dk/login',
      handleCodeInApp: true
    }

    firebase
      .auth()
      .sendSignInLinkToEmail(this.state.email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', this.state.email)
        this.setState({
          status: 'Check your email for login link!'
        })
      })
      .catch(error => {
        this.setState({
          status: 'Something went wrong! Check the console.'
        })
        console.log(error)
      })
  }
  finishLogin() {
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
          this.setState({
            status: 'Successful login!'
          })
          window.localStorage.removeItem('emailForSignIn')
          await this.sendToBackend()
          window.location.href = '/profile'
        })
        .catch(error => {
          this.setState({
            status: 'Error logging in! See console.'
          })
          console.log('error', error)
        })
    }
  }
  getToken() {
    return firebase.auth().currentUser.getIdToken(true)
  }
  async sendToBackend() {
    const token = await this.getToken()
    return fetch('https://auth.copenhagenjs.dk/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    }).catch(e => console.log(e))
  }
  render() {
    return (
      <Page>
        <h1>Login</h1>
        <div>
          <TextInput
            required
            type="email"
            label="Email:"
            name="email"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <Button
            type="button"
            display="block"
            size="lg"
            margin="20px 0"
            onClick={() => this.handleLogin()}
          >
            Login
          </Button>
          {this.state.status}
        </div>
      </Page>
    )
  }
}
