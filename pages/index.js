import 'isomorphic-unfetch'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import Layout from '../components/Layout'
import Map from '../components/Map'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const client = new ApolloClient({
  uri: 'https://graphql.copenhagenjs.dk/graphql'
})

function Event() {
  const { loading, error, data } = useQuery(gql`
    {
      events(last: 1) {
        title
        date
        link
        content
        location
      }
    }
  `)

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>

  return (
    <section className="page">
      <style jsx>{`
        .page {
          flex: 1;
        }
        .date {
          font-size: 1.5rem;
        }
        .description {
        }
        .description :global(h1) {
          margin: 5px 0;
        }
      `}</style>
      <div className="date">
        {data.events[0].date &&
          new Date(parseInt(data.events[0].date)).toLocaleString('da-DK')}
      </div>
      <div
        className="description"
        dangerouslySetInnerHTML={{
          __html: data.events[0].content
        }}
      />
      <div className="next-meetup">
        <p>Read more and sign up for the next event here:</p>

        <a
          className="next-meetup__button"
          href="https://www.meetup.com/copenhagenjs/"
        >
          View meetup group
        </a>
      </div>
      {data.events[0].location && <Map location={data.events[0].location} />}
    </section>
  )
}

export default () => (
  <ApolloProvider client={client}>
    <Layout>
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
      <Event />
      <Footer />
    </Layout>
  </ApolloProvider>
)
