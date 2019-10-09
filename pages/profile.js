import React from 'react'
import 'isomorphic-unfetch'
import { gql } from 'apollo-boost'
import { client } from '../services/graphql.js'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import Page from '../components/Page'

const Profile = () => {
  const { loading, error, data } = useQuery(gql`
    {
      me {
        name
        githubId
      }
    }
  `)

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
