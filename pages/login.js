import React from 'react'
import Page from '../components/Page'
import TextInput from '../components/TextInput'
import Button from '../components/Button'

export default class Videos extends React.Component {
  render() {
    return (
      <Page>
        <h1>Login</h1>
        <div>
          <TextInput required type="email" label="Email:" name="email" />
          <Button type="button" display="block" size="lg" margin="20px 0">
            Login
          </Button>
        </div>
      </Page>
    )
  }
}
