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
          username
          created
          image
          githubId
          twitterId
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

  if (error) {
    return <div>Error :(</div>
  }

  if (loading) {
    return <div>Loading</div>
  }
  return (
    <Page>
      <h1>Manage</h1>
      {data && data.users && (
        <>
          <p>There are {data.users.length} users.</p>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Username</th>
                <th>Created</th>
                <th>Github</th>
                <th>Twitter</th>
                <th>Website</th>
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
                    {user.username && user.username.length > 0 ? (
                      <a href={`/manage/user/?username=${user.username}`}>
                        Profile
                      </a>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {user.created
                      ? `${(new Date(user.created).getDate() + 1)
                          .toString()
                          .padStart(2, '0')}/${(
                          new Date(user.created).getMonth() + 1
                        )
                          .toString()
                          .padStart(2, '0')}/${new Date(
                          user.created
                        ).getFullYear()}`
                      : ''}
                  </td>
                  <td>
                    <a href={`https://github.com/${user.githubId}`}>GitHub</a>
                  </td>
                  <td>
                    <a href={`https://twitter.com/${user.twitterId}`}>
                      Twitter
                    </a>
                  </td>
                  <td>
                    {user.website && user.website.length > 0 ? (
                      <a href={user.website}>Website</a>
                    ) : (
                      ''
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </Page>
  )
}
