import 'isomorphic-unfetch'
import { gql } from 'apollo-boost'
import { client } from '../services/graphql.js'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import Page from '../components/Page'
import { getParams } from '../services/url'

function Presentation() {
  const { loading, error, data } = useQuery(
    gql`
      query Presentations($eventslug: String!, $titleslug: String!) {
        presentation(eventslug: $eventslug, titleslug: $titleslug) {
          title
        }
      }
    `,
    {
      variables: {
        eventslug: getParams().get('event'),
        titleslug: getParams().get('title')
      }
    }
  )

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>

  return <div>{data.presentation.title}</div>
}

export default () => (
  <ApolloProvider client={client}>
    <Page>
      <h1>Presentation</h1>
      <Presentation />
    </Page>
  </ApolloProvider>
)
