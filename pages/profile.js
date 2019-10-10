import React from 'react'
import 'isomorphic-unfetch'
import { gql } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useLazyQuery } from '@apollo/react-hooks'
import Page from '../components/Page'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import ApolloClient from 'apollo-boost'

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
  const [getProfile, { loading, error, data }] = useLazyQuery(
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

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>
  if (!data) {
    return <div>Logging in</div>
  }

  return (
    <>
      <div>
        <strong>Name:</strong>
      </div>
      <div>{data.me.name}</div>
      <div>
        <strong>Github:</strong>
      </div>
      <div>{data.me.githubId}</div>
      <button
        onClick={() => {
          updateProfile({
            variables: {
              input: {
                name: 'Kevin ' + Date.now(),
                githubId: 'kevinsimper ' + Date.now()
              }
            }
          })
        }}
      >
        Update Profile
      </button>
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
