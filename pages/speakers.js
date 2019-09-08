import 'isomorphic-unfetch'
import Head from 'next/head'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import Page from '../components/Page'

const client = new ApolloClient({
  uri: 'https://graphql.copenhagenjs.dk/graphql'
})

function Speakers() {
  const { loading, error, data } = useQuery(gql`
    {
      speakers {
        name
        title
        slug
        event {
          link
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
            <a href={speaker.event.link}>{speaker.title}</a>
          </div>
        )
      })}
    </div>
  )
}

export default () => (
  <ApolloProvider client={client}>
    <Page>
      {' '}
      <Head>
        <title>Speakers at CopenhagenJS</title>
      </Head>
      <h1>Speakers</h1>
      <Speakers />
    </Page>
  </ApolloProvider>
)
