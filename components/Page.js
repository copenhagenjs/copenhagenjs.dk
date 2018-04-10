import Layout from '../components/Layout'

export default ({ children }) => {
  return (
    <Layout>
      <header className="page-header bg-grey" role="navigation">
        <div className="page">
          <a href="/">
            <img className="logo" src="/static/images/cphjs.png" />
          </a>

          <ul className="navigation">
            <li>
              <a className="btn-white" href="/events/">
                All events
              </a>
            </li>
            <li>
              <a className="btn-white" href="/media/">
                Photos & Video
              </a>
            </li>
            <li>
              <a className="btn-white" href="/about/">
                About
              </a>
            </li>
          </ul>
        </div>
      </header>

      <section className="page">{children}</section>
    </Layout>
  )
}
