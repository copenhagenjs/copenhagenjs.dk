import React from 'react'
import 'isomorphic-unfetch'
import { gql } from 'apollo-boost'
import { client } from '../services/graphql.js'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import Page from '../components/Page'

const Embed = ({ youtubeId }) => {
  return (
    <div
      className="video"
      style={{
        position: 'relative',
        paddingBottom: '56.25%' /* 16:9 */,
        paddingTop: 25,
        height: 0
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
        src={`https://www.youtube.com/embed/${youtubeId}`}
        frameBorder="0"
      />
    </div>
  )
}

function Videos() {
  const { loading, error, data } = useQuery(gql`
    {
      videos {
        title
        name
        youtubeId
      }
    }
  `)

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>
  return (
    <div className="videos">
      <style jsx>{`
        @media (min-width: 800px) {
          .videos {
            display: flex;
            flex-wrap: wrap;
          }
          .video {
            width: 50%;
            padding: 0 10px;
          }
          h3 {
            min-height: 100px;
            margin: 0 0 10px;
            font-size: 1.5rem;
          }
        }
      `}</style>
      {data.videos.reverse().map(({ title, name, youtubeId }, key) => (
        <div key={key} className="video">
          <Embed youtubeId={youtubeId} />
          <h3>
            {title} - {name}
          </h3>
        </div>
      ))}
    </div>
  )
}

export default class VideosComponent extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Page>
          <h1>Videos</h1>
          <p>
            <a href="https://www.youtube.com/channel/UCOD8lwED5PAcgmhwymQJsng">
              Subscribe to us on Youtube
            </a>
          </p>
          <Videos />
        </Page>
      </ApolloProvider>
    )
  }
}
