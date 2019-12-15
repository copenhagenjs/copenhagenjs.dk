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
      speakerProfiles {
        name
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
  const presentations = data.speakerProfiles
    .map(s => s.presentations)
    .flat()
    .reverse()
  return (
    <div>
      <p>There have been {presentations.length} talks.</p>

      {presentations.map((presentation, key) => {
        return (
          <div key={key}>
            <a href={presentation.event.selfLink}>{presentation.title}</a>
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
