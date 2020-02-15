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
      query Presentations($nameslug: String!, $titleslug: String!) {
        presentation(nameslug: $nameslug, titleslug: $titleslug) {
          title
        }
      }
    `,
    {
      variables: {
        nameslug: getParams().get('name'),
        titleslug: getParams().get('title')
      }
    }
  )

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>

  return (
    <div>
      {data.presentation.title}
    </div>
  )
}

export default () => (
  <ApolloProvider client={client}>
    <Page>
      <h1>
        Presentations
      </h1>
      <Presentation/>
    </Page>
  </ApolloProvider>
)
