import React from 'react'
import 'isomorphic-unfetch'
import Head from 'next/head'
import { gql } from 'apollo-boost'
import { client } from '../services/graphql.js'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import Page from '../components/Page'

export function getParams() {
  return new URLSearchParams(
    typeof window == 'object' ? window.location.search : ''
  )
}

export const SpeakerProfile = ({ name, presentations = [] }) => (
  <>
    <h1>{name}</h1>
    <p>
      {name} have spoken at {presentations.length} CopenhagenJS event
      {presentations.length > 1 ? 's' : ''}.
    </p>

    <table>
      <thead>
        <tr>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {presentations.reverse().map(title => {
          return (
            <tr key={title}>
              <td>{title}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </>
)

function Speakers() {
  const slug = getParams().get('name')
  const { loading, error, data } = useQuery(gql`
    {
      speakerProfile(slug: "${slug}") {
        name
        presentations
      }
    }
  `)

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>
  return (
    <div>
      <Head>
        <title>{data.speakerProfile.name} spoke at CopenhagenJS</title>
      </Head>
      <SpeakerProfile
        name={data.speakerProfile.name}
        presentations={data.speakerProfile.presentations}
      />
    </div>
  )
}

export default () => (
  <ApolloProvider client={client}>
    <Page>
      <Speakers />
    </Page>
  </ApolloProvider>
)
