import 'isomorphic-unfetch'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import Page from '../components/Page'

const client = new ApolloClient({
  uri: 'https://graphql.copenhagenjs.dk/graphql'
})

function getParams() {
  return new URLSearchParams(
    typeof window == 'object' ? window.location.search : ''
  )
}

function Speakers() {
  const slug = getParams().get('name')
  const { loading, error, data } = useQuery(gql`
    {
      speaker(slug: "${slug}") {
        name
        title
        event {
          link
        }
      }
    }
  `)

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>
  if (data.speaker.length === 0) return <span>Could not find speaker</span>
  return (
    <div>
      <h1>Speaker: {data.speaker[0].name}</h1>
      <p>The person has {data.speaker.length} talks.</p>

      {data.speaker.reverse().map(speaker => {
        return (
          <div key={speaker.title}>
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
      <Speakers />
    </Page>
  </ApolloProvider>
)
