import React from 'react'
import 'isomorphic-unfetch'
import { gql } from 'apollo-boost'
import { client } from '../services/graphql.js'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import Page from '../components/Page'
import { Embed } from '../components/YoutubeEmbed'
import { getParams } from './speaker.js'

function Video() {
  const slug = getParams().get('name')
  const { loading, error, data } = useQuery(gql`
    {
      video(slug: "${slug}") {
        title
        name
        youtubeId
      }
    }
  `)

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>
  const { title, name, youtubeId } = data.video
  return (
    <div className="video">
      <style jsx>{``}</style>
      <h2>
        {title} - {name}
      </h2>
      <div className="video">
        <Embed youtubeId={youtubeId} />
      </div>
    </div>
  )
}

export default class VideosComponent extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Page>
          <div>
            <a href="/videos">⬅️ Go back to all videos</a>
          </div>
          <br />
          <Video />
          <p>
            <a href="https://www.youtube.com/channel/UCOD8lwED5PAcgmhwymQJsng">
              Subscribe to CopenhagenJS on Youtube
            </a>
          </p>
        </Page>
      </ApolloProvider>
    )
  }
}
