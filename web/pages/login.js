import * as firebase from 'firebase/app'
import 'firebase/auth'
import React from 'react'
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
  }
  handleLogin() {
    var actionCodeSettings = {
      url: window.location.origin + '/login-forward',
      // url: 'https://copenhagenjs.dk/login-forward',
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
