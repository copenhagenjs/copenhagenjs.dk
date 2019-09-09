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
    if (typeof window !== 'undefined') {
      window.initAccountkit = this.init
      if (AccountKit && AccountKit.init) {
        console.log('AccountKit already loaded')
        this.init()
      }
    }
  }
  componentDidMount() {
    console.log('AccountKit', AccountKit)
  }
  init() {
    console.log('Init', process.env.ACCOUNTKIT)
    AccountKit.init({
      appId: process.env.ACCOUNTKIT,
      version: 'v1.3',
      state: 'test',
      debug: true
    })
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
