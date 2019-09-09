import React from 'react'
import Head from 'next/head'
import Page from '../components/Page'
import TextInput from '../components/TextInput'
import Button from '../components/Button'

export default class Videos extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      accountKitReady: false
    }
    if (typeof window !== 'undefined') {
      window.initAccountkit = this.init.bind(this)
      if (AccountKit && AccountKit.init) {
        console.log('AccountKit already loaded')
        this.initAccountkit()
        this.state.accountKitReady = true
      }
    }
  }
  init() {
    this.initAccountkit()
    this.setState({
      accountKitReady: true
    })
  }
  initAccountkit() {
    console.log('Init', process.env.ACCOUNTKIT, window.initAccountkitDone)
    if(!window.initAccountkitDone) {
      AccountKit.init({
        appId: process.env.ACCOUNTKIT,
        version: 'v1.3',
        state: 'test',
        debug: true
      })
      window.initAccountkitDone = true
    }
  }
  handleLogin() {
    AccountKit.login('EMAIL', { emailAddress: this.state.email }, res => {
      console.log(res)
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
          {this.state.accountKitReady && <Button
            type="button"
            display="block"
            size="lg"
            margin="20px 0"
            onClick={() => this.handleLogin()}
          >
            Login
          </Button>}
        </div>
        <Head>
          <script src="https://sdk.accountkit.com/en_US/sdk.js"></script>
        </Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            AccountKit_OnInteractive = window.initAccountkit
            `
          }}
        />
      </Page>
    )
  }
}
