import React from 'react'
import 'isomorphic-unfetch'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import Page from '../components/Page'

const client = new ApolloClient({
  uri: 'https://graphql.copenhagenjs.dk/graphql'
})

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
  return data.videos.reverse().map(({ title, name, youtubeId }, key) => (
    <div key={key}>
      <h3>
        {title} - {name}
      </h3>
      <Embed youtubeId={youtubeId} />
    </div>
  ))
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
