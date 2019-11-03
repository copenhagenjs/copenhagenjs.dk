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

export const SpeakerProfile = ({ name, presentations = [], user }) => (
  <>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 30 }}>
      <div>
        {user && user.image && (
          <img
            src={user.image}
            width="200px"
            style={{ borderRadius: 100, float: 'left', marginRight: 30 }}
          />
        )}
      </div>
      <div>
        <h1>{name}</h1>
        <div>
          {name} have spoken at {presentations.length} CopenhagenJS event
          {presentations.length > 1 ? 's' : ''}.
        </div>
        <ul>
          {user && user.twitterId && (
            <li>
              <a href={`https://twitter.com/${user.twitterId}`}>Twitter</a>
            </li>
          )}
          {user && user.githubId && (
            <li>
              <a href={`https://github.com/${user.githubId}`}>Github</a>
            </li>
          )}
          {user && user.website && (
            <li>
              <a href={user.website}>Website</a>
            </li>
          )}
        </ul>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {presentations.reverse().map(presentation => {
          const date = new Date(parseInt(presentation.event.date))
          return (
            <tr key={presentation.title}>
              <td>
                {date
                  .getDate()
                  .toString()
                  .padStart(2, '0')}
                /{(date.getMonth() + 1).toString().padStart(2, '0')}/
                {date.getFullYear()}
              </td>
              <td>
                <a href={presentation.event.selfLink}>{presentation.title}</a>
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
      speakerProfile(slug: "${slug}") {
        name
        user {
          image
          twitterId
          githubId
          website
        }
        ghostUser {
          image
          twitterId
          githubId
          website
        }
        presentations {
          title
          event {
            date
            selfLink
          }
        }
      }
    }
  `)

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>
  const user = data.speakerProfile.ghostUser || data.speakerProfile.user
  return (
    <div>
      <Head>
        <title>{data.speakerProfile.name} spoke at CopenhagenJS</title>
      </Head>
      <SpeakerProfile
        name={data.speakerProfile.name}
        presentations={data.speakerProfile.presentations}
        user={user}
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
