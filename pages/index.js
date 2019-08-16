import React from 'react'
import Layout from '../components/Layout'
import Map from '../components/Map'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import marked from 'marked'

export default class IndexRoutes extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      markdown: '',
      localtion: '',
      date: ''
    }
  }
  async fetchLatestPost() {
    const fm = await import('front-matter')
    const req = await fetch('/static/posts/2019-08-22-august-meetup.md')
    const data = await req.text()
    const content = fm.default(data)
    this.setState({
      loading: true,
      markdown: content.body,
      location: content.attributes.location,
      date: content.attributes.date
    })
  }
  componentDidMount() {
    this.fetchLatestPost()
  }
  render() {
    return (
      <Layout>
        <style jsx>{`
          .date {
            font-size: 1.5rem;
          }
          .description {
          }
          .description :global(h1) {
            margin: 5px 0;
          }
        `}</style>
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

          <a
            className="credits"
            href="http://www.flickr.com/photos/tenzer/8148224729/"
          >
            Photo by Jeppe Toustrup
          </a>
        </header>

        {!this.state.loading && (
          <section className="page">Fetching latest meetup..</section>
        )}
        {this.state.loading && (
          <section className="page">
            <div className="date">
              {this.state.date && this.state.date.toLocaleString('da-DK')}
            </div>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html: marked(this.state.markdown)
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
            {this.state.location && <Map location={this.state.location} />}
          </section>
        )}
        <Footer />
      </Layout>
    )
  }
}
