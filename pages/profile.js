import React from 'react'
import 'isomorphic-unfetch'
import { gql } from 'apollo-boost'
import { client } from '../services/graphql.js'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Page from '../components/Page'

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: ProfileInput!) {
    updateProfile(input: $input) {
      name
      githubId
    }
  }
`

const Profile = () => {
  const { loading, error, data } = useQuery(gql`
    {
      me {
        name
        githubId
      }
    }
  `)

  const [updateProfile, { updateProfileData }] = useMutation(UPDATE_PROFILE)

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>

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
