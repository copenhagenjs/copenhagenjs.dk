import React, { useState } from 'react'
import 'isomorphic-unfetch'
import { gql } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useLazyQuery } from '@apollo/react-hooks'
import Page from '../components/Page'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import ApolloClient from 'apollo-boost'
import TextInput from '../components/TextInput'
import Button from '../components/Button'

const client = new ApolloClient({
  uri: 'https://graphql.copenhagenjs.dk/graphql'
})

const initFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyBchWNVQsL7YEcTtf369PYTP-DLTiB7Vac',
    projectId: 'copenhagenjsdk'
  }
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
}

let token = ''
let outerGetProfile = null
const firebaseLogin = new Promise((resolve, reject) => {
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
  .then(newToken => {
    token = newToken
    outerGetProfile()
  })
  .catch(e => {
    console.log('It is okay')
  })

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: ProfileInput!) {
    updateProfile(input: $input) {
      name
      githubId
    }
  }
`

const Profile = () => {
  const [name, setName] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [githubId, setGithubId] = useState('')
  const [getProfile, { called, loading, error, data }] = useLazyQuery(
    gql`
      {
        me {
          name
          githubId
        }
      }
    `,
    {
      context: {
        headers: {
          authorization: 'bearer ' + token
        }
      },
      onCompleted(data) {
        if (error) return false
        if (!loaded && data.me) {
          setLoaded(true)
          if (data.me.name) {
            setName(data.me.name)
          }
          if (data.me.githubId) {
            setGithubId(data.me.githubId)
          }
        }
      }
    }
  )
  outerGetProfile = getProfile

  const [updateProfile, { updateProfileData }] = useMutation(UPDATE_PROFILE, {
    context: {
      headers: {
        authorization: 'bearer ' + token
      }
    }
  })

  const button = (
    <Button
      type="button"
      display="block"
      size="lg"
      margin="20px 0"
      onClick={() => {
        updateProfile({
          variables: {
            input: {
              name,
              githubId
            }
          }
        })
      }}
    >
      Update Profile
    </Button>
  )

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :( {button}</span>
  if (!data) {
    return <div>Logging in</div>
  }

  return (
    <>
      <div>
        <TextInput
          required
          type="text"
          label="Name:"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div>
        <TextInput
          required
          type="text"
          label="GitHub:"
          name="github"
          value={githubId}
          onChange={e => setGithubId(e.target.value)}
        />
      </div>
      {button}
    </>
  )
}

export default () => {
  return (
    <Page>
      <ApolloProvider client={client}>
        <h1>Public Profile</h1>
        <Profile />
      </ApolloProvider>
    </Page>
  )
}
