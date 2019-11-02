import Head from 'next/head'
import 'isomorphic-unfetch'
import { gql } from 'apollo-boost'
import { client } from '../services/graphql.js'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import Layout from '../components/Layout'
import Map from '../components/Map'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Event from '../components/Event'

function EventGraph() {
  const { loading, error, data } = useQuery(gql`
    {
      events(first: 1, status: UPCOMING) {
        title
        date
        link
        content
        location
        presentations {
          title
          name
        }
      }
    }
  `)

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>

  const { content, title, date, link, presentations, location } = data.events[0]
  return (
    <>
      <Event
        title={title}
        date={new Date(parseInt(date))}
        html={content}
        location={location}
        speakers={presentations}
        link={link}
      />
    </>
  )
}

export default () => (
  <ApolloProvider client={client}>
    <Layout>
      <Head>
        <title>CopenhagenJS - a JavaScript meetup in Copenhagen</title>
      </Head>
      <header className="page-header master bg-grey" role="navigation">
        <Navigation />

        <img
          className="logo"
          src="/static/images/cphjs.png"
          alt="CopenhagenJS logo"
        />
        <h3>
          CopenhagenJS is a monthly meetup for people interested in JavaScript
          in Copenhagen.
        </h3>
      </header>
      <section className="page">
        <EventGraph />
      </section>
      <Footer />
    </Layout>
  </ApolloProvider>
)
