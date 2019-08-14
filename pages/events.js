import 'isomorphic-unfetch'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import Page from '../components/Page'

const client = new ApolloClient({
  uri: 'https://graphql.copenhagenjs.dk/graphql'
})

function Events() {
  const { loading, error, data } = useQuery(gql`
    {
      events {
        title
        date
        link
      }
    }
  `)

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>
  return data.events.reverse().map(({ title, date, link }) => (
    <li key={title}>
      <a href={link}>{title}</a> -{' '}
      {new Date(parseInt(date)).toLocaleString('da-DK')}
    </li>
  ))
}

export default () => (
  <ApolloProvider client={client}>
    <Page>
      <h1>Events</h1>
      <div>
        You can find the newest meetups on{' '}
        <a href="https://www.meetup.com/copenhagenjs/">
          meetup.com/copenhagenjs
        </a>
      </div>
      <ul>
        <Events />
      </ul>
    </Page>
  </ApolloProvider>
)
