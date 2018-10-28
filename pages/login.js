import React from 'react';
import Head from 'next/head';
import Page from '../components/Page';
import TextField, { HelperText, Input } from '@material/react-text-field';
import Button from '@material-ui/core/Button'
import '@material/react-text-field/dist/text-field.css';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
    if (typeof window !== 'undefined') {
      window.initAccountkit = this.init;
      if (AccountKit && AccountKit.init) {
        console.log('AccountKit already loaded');
        this.init();
      }
    }
  }
  init() {
    AccountKit.init({
      appId: '244894879524435',
      version: 'v1.3',
      state: 'test',
      debug: true,
    });
  }
  handleLogin() {
    AccountKit.login('EMAIL', { emailAddress: this.state.email }, res => {
      console.log(res);
    });
  }

  render() {
    return (
      <Page>
        <h1>Login</h1>
        <TextField
            label="Email"
            style={{ maxWidth: 360, width: '100%' }}
            helperText={
              <HelperText>What email do you want to login with?</HelperText>
            }>
            <Input
              type="email"
              style={{ maxWidth: 360, width: '100%' }}
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </TextField>
          <div>
            <Button size="small" color="primary" unelevated onClick={() => this.handleLogin()}>
              Login
            </Button>
          </div>
          <Head>
            <script src="https://sdk.accountkit.com/en_US/sdk.js" />
          </Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              AccountKit_OnInteractive = window.initAccountkit
              `,
            }}
          />
      </Page>
    );
  }
}
