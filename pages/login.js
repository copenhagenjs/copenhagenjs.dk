import React from 'react'
import Head from 'next/head'
import Page from '../components/Page'
import TextInput from '../components/TextInput'
import Button from '../components/Button'

export default class Videos extends React.Component {
  constructor() {
    super()
    this.state = {
      email: ''
    }
  }
  handleLogin() {}
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
        </div>
      </Page>
    )
  }
}
