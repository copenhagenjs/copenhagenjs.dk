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

  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <div>
      <p>There have been {presentations.length} talks.</p>
      <table>
        <tbody>
          {presentations.map((presentation, key) => {
            return (
              <tr key={key}>
                <td style={{ width: 110 }}>
                  {formatter.format(
                    new Date(parseInt(presentation.event.date))
                  )}
                </td>
                <td>
                  <a href={presentation.event.selfLink}>{presentation.title}</a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
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
