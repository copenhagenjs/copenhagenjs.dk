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

export default () => {
  const [token, setToken] = useState('')

  const [getProfile, { called, loading, error, data }] = useLazyQuery(
    gql`
      {
        users {
          name
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
      getProfile()
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
      <h1>Manage</h1>
      {loading && <div>Loading</div>}
      {error && <div>Error :(</div>}
      {data && data.users && (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Github</th>
              <th>Twitter</th>
              <th>Website</th>
              <th>Instagram</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user, key) => (
              <tr key={key}>
                <td>
                  {user.image ? (
                    <img src={user.image} width={40} />
                  ) : (
                    <div style={{ height: 40 }} />
                  )}
                </td>
                <td>{user.name || ''}</td>
                <td>
                  <a href={`https://github.com/${user.githubId}`}>
                    {user.githubId || ''}
                  </a>
                </td>
                <td>
                  <a href={`https://twitter.com/${user.twitterId}`}>
                    {user.twitterId || ''}
                  </a>
                </td>
                <td>
                  <a href={user.website}>Website</a>
                </td>
                <td>
                  <a href={`https://instagram.com/${user.instagramId}`}>
                    {user.instagramId || ''}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Page>
  )
}
