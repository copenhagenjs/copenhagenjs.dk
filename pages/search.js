import 'isomorphic-unfetch'
import React, { useState, useEffect } from 'react'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import Page from '../components/Page'

const client = new ApolloClient({
  uri: 'https://graphql.copenhagenjs.dk/graphql'
})

const SEARCHEVENTS = gql`
  query SearchEvents($query: String!) {
    searchEvents(query: $query) {
      title
      date
      link
      type
    }
  }
`

function Events({ query }) {
  const { loading, error, data } = useQuery(SEARCHEVENTS, {
    variables: {
      query
    }
  })

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>
  return data.searchEvents.reverse().map(({ title, date, link, type }) => (
    <tr key={title}>
      <td>
        <a href={link}>{title}</a>
      </td>
      <td>{new Date(parseInt(date)).toLocaleString('da-DK')}</td>
      <td>{type}</td>
    </tr>
  ))
}

function getParams() {
  return new URLSearchParams(
    typeof window == 'object' ? window.location.search : ''
  )
}

export default () => {
  const [queryTerm, setQueryTerm] = useState(getParams().get('query') || '')

  useEffect(() => {
    const params = getParams()
    params.set('query', queryTerm)
    history.pushState({}, 'Search: ' + queryTerm, 'search?' + params.toString())
  }, [queryTerm])

  return (
    <ApolloProvider client={client}>
      <Page>
        <h1>Search</h1>
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            onChange={e => setQueryTerm(e.target.value)}
            value={queryTerm}
            placeholder="Write here to search"
            style={{ fontSize: '2rem' }}
          />
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
            {queryTerm.length > 0 ? <Events query={queryTerm} /> : <tr></tr>}
          </tbody>
        </table>
      </Page>
    </ApolloProvider>
  )
}
