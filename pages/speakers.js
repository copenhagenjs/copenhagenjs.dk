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
        slug
        user {
          image
        }
        ghostUser {
          image
        }
      }
    }
  `)

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>
  return (
    <div>
      <p>There has been {data.speakerProfiles.length} speakers.</p>

      {data.speakerProfiles.reverse().map(speakerProfile => {
        const selectUser = speakerProfile.user || speakerProfile.ghostUser
        return (
          <div
            key={speakerProfile.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '0 0 10px'
            }}
          >
            <div style={{ width: 50 }}>
              {selectUser && selectUser.image && (
                <img
                  width={50}
                  style={{ borderRadius: 50, verticalAlign: 'middle' }}
                  src={selectUser.image}
                />
              )}
            </div>
            <strong style={{ margin: '0 0 0 10px' }}>
              <a href={'/speaker?name=' + speakerProfile.slug}>
                {speakerProfile.name}
              </a>
            </strong>
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
      <p>
        See all{' '}
        <strong>
          <a href="/presentations">presentations</a>
        </strong>{' '}
        here!
      </p>
      <Speakers />
    </Page>
  </ApolloProvider>
)
