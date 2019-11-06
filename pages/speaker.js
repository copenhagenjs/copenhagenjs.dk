import React from 'react'
import 'isomorphic-unfetch'
import Head from 'next/head'
import { gql } from 'apollo-boost'
import { client } from '../services/graphql.js'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import Page from '../components/Page'
import { Embed } from '../components/YoutubeEmbed'
import {
  SpeakerProfile,
  SpeakerProfileVideos
} from '../components/SpeakerProfile.js'

export function getParams() {
  return new URLSearchParams(
    typeof window == 'object' ? window.location.search : ''
  )
}

function Speakers() {
  const slug = getParams().get('name')
  const { loading, error, data } = useQuery(gql`
    query {
      speakerProfile(slug: "${slug}") {
        name
        slug
        videos {
          ...SpeakerProfileVideos
        }
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
    ${SpeakerProfileVideos.fragment}
  `)

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>
  const user = data.speakerProfile.ghostUser || data.speakerProfile.user
  return (
    <div>
      <Head>
        <title>{data.speakerProfile.name} spoke at CopenhagenJS</title>
        <link
          rel="canonical"
          href={`https://copenhagenjs.dk/speaker/?name=${data.speakerProfile.slug}`}
        />
      </Head>
      <SpeakerProfile
        name={data.speakerProfile.name}
        presentations={data.speakerProfile.presentations}
        user={user}
        videos={data.speakerProfile.videos}
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
