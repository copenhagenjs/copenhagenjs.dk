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
        youtubeId,
        speakerProfile {
          slug
          user {
            image
          }
          ghostUser {
            image
          }
        }
      }
    }
  `)

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>
  if (!data.video) return <span>Didn't find video</span>

  const { title, name, youtubeId, speakerProfile } = data.video
  const user = speakerProfile.user || speakerProfile.ghostUser
  return (
    <div className="video">
      <style jsx>{``}</style>
      <h2>
        {title} -{' '}
        {speakerProfile.slug ? (
          <>
            <a href={`/speaker/?name=${speakerProfile.slug}`}>
              {user && user.image && (
                <img
                  width={30}
                  style={{ borderRadius: 30, verticalAlign: 'middle' }}
                  src={user.image}
                />
              )}
              &nbsp;
              {name}
            </a>
          </>
        ) : (
          { name }
        )}
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
            <a href="/videos">See all videos</a>
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
