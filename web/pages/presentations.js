import 'isomorphic-unfetch'
import Head from 'next/head'
import { gql } from 'apollo-boost'
import { client } from '../services/graphql.js'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import Page from '../components/Page'

function Speakers() {
  const { loading, error, data } = useQuery(gql`
    {
      speakers {
        name
        title
        slug
        event {
          selfLink
        }
      }
    }
  `)

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>
  return (
    <div>
      <p>There has been {data.speakers.length} talks.</p>

      {data.speakers.reverse().map(speaker => {
        return (
          <div key={speaker.title}>
            <strong>
              <a href={'/speaker?name=' + speaker.slug}>{speaker.name}</a>
            </strong>
            {' - '}
            <a href={speaker.event.selfLink}>{speaker.title}</a>
          </div>
        )
      })}
    </div>
  )
}

export default () => (
  <ApolloProvider client={client}>
    <Page>
      <Head>
        <title>Presentations at CopenhagenJS</title>
      </Head>
      <h1>Presentations</h1>
      <p>
        See all{' '}
        <strong>
          <a href="/speakers">speakers</a>
        </strong>{' '}
        here!
      </p>
      <Speakers />
    </Page>
  </ApolloProvider>
)
