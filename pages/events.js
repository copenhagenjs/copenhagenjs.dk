import 'isomorphic-unfetch'
import { gql } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import { client } from '../services/graphql.js'
import Page from '../components/Page'

function Events() {
  const { loading, error, data } = useQuery(gql`
    {
      events {
        title
        date
        link
        type
      }
    }
  `)

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>
  return data.events.reverse().map(({ title, date, link, type }) => (
    <tr key={title}>
      <td>
        <a href={link}>{title}</a>
      </td>
      <td>{new Date(parseInt(date)).toLocaleString('da-DK')}</td>
      <td>{type}</td>
    </tr>
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
        .
      </div>
      <div>
        <a href="/search/">Search meetups</a>
      </div>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <Events />
        </tbody>
      </table>
    </Page>
  </ApolloProvider>
)
