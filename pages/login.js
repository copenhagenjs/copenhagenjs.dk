import React from 'react';
import Head from 'next/head';
import Page from '../components/Page';
import TextField, { HelperText, Input } from '@material/react-text-field';
import Button from '@material-ui/core/Button'
import '@material/react-text-field/dist/text-field.css';
import axios from 'axios';

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
      appId:"248317325862187",
      state: "test",
      version:"v1.3",
      debug:true
    });
  }
  handleLogin() {
    AccountKit.login('EMAIL', { emailAddress: this.state.email }, res => {
      if (res.status === "PARTIALLY_AUTHENTICATED") {
        var code = res.code;
        var csrf = res.state;
        // Send code to server to exchange for access token
        axios.post('http://localhost:8880/login_success', {
          code: code,
          csrf: csrf
        })
        .then((res) => {
          console.log(res);
        })
      }
      else if (res.status === "NOT_AUTHENTICATED") {
        // handle authentication failure
        console.log("error");
      }
      else if (res.status === "BAD_PARAMS") {
        // handle bad parameters
        console.log("err");
      }
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
