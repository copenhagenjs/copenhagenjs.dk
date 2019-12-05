import 'isomorphic-unfetch'
import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { ApolloProvider, useLazyQuery } from '@apollo/react-hooks'
import ApolloClient, { gql } from 'apollo-boost'
import Page from '../../components/Page'
import { initFirebase, redirectToLogin } from '../../services/firebase.js'

const client = new ApolloClient({
  uri: 'https://graphql.copenhagenjs.dk/graphql'
})

export function getParams() {
  return new URLSearchParams(
    typeof window == 'object' ? window.location.search : ''
  )
}

export default () => {
  const [token, setToken] = useState('')

  const [getProfile, { called, loading, error, data }] = useLazyQuery(
    gql`
      query Profile($username: String!) {
        user(username: $username) {
          id
          name
          username
          image
          githubId
          twitterId
          instagramId
          website
        }
      }
    `,
    {
      client,
      context: {
        headers: {
          authorization: 'bearer ' + token
        }
      }
    }
  )
  useEffect(() => {
    if (token.length > 0) {
      getProfile({
        variables: {
          username: getParams().get('username')
        }
      })
    }
  }, [token])

  useEffect(() => {
    initFirebase()
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        const result = await user.getIdTokenResult()
        setToken(result.token)
      } else {
        // No user is signed in.
        redirectToLogin()
      }
    })
  }, [])

  return (
    <Page>
      <h1>User</h1>
      {loading && <div>Loading</div>}
      {error && <div>Error :(</div>}
      {data && data.user && (
        <div>
          <div>
            {data.user.image && <img src={data.user.image} width={140} />}
          </div>
          <div>
            <strong>Id:</strong>
          </div>
          <div>{data.user.id || ''}</div>
          <div>
            <strong>Name:</strong>
          </div>
          <div>{data.user.name || ''}</div>
          <div>
            <strong>Username:</strong>
          </div>
          <div>{data.user.username || ''}</div>
          <div>
            <strong>Github:</strong>
          </div>
          <div>
            <a href={`https://github.com/${data.user.githubId}`}>
              {data.user.githubId || ''}
            </a>
          </div>
          <div>
            <strong>Twitter:</strong>
          </div>
          <div>
            <a href={`https://twitter.com/${data.user.twitterId}`}>
              {data.user.twitterId || ''}
            </a>
          </div>
          <div>
            <strong>Website:</strong>
          </div>
          <div>
            <a href={data.user.website}>{data.user.website}</a>
          </div>
          <div>
            <strong>Instagram:</strong>
          </div>
          <div>
            <a href={`https://instagram.com/${data.user.instagramId}`}>
              {data.user.instagramId || ''}
            </a>
          </div>
        </div>
      )}
    </Page>
  )
}
