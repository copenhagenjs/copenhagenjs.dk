import React from 'react'
import 'isomorphic-unfetch'
import Head from 'next/head'
import { gql } from 'apollo-boost'
import { client } from '../services/graphql.js'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import Page from '../components/Page'

function getParams() {
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
          <th>Date</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {presentations.reverse().map(speaker => {
          const date = new Date(parseInt(speaker.event.date))
          return (
            <tr key={speaker.title}>
              <td>
                {date
                  .getDate()
                  .toString()
                  .padStart(2, '0')}
                /{(date.getMonth() + 1).toString().padStart(2, '0')}/
                {date.getFullYear()}
              </td>
              <td>
                <a href={speaker.event.link}>{speaker.title}</a>
              </td>
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
      speaker(slug: "${slug}") {
        name
        title
        event {
          link
          date
        }
      }
    }
  `)

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>
  if (data.speaker.length === 0) return <span>Could not find speaker</span>
  return (
    <div>
      <Head>
        <title>{data.speaker[0].name} spoke at CopenhagenJS</title>
      </Head>
      <SpeakerProfile
        name={data.speaker[0].name}
        presentations={data.speaker}
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
