import Layout from '../components/Layout'
import Navigation from '../components/Navigation'

export default ({ children }) => {
  return (
    <Layout>
      <header className="page-header bg-grey" role="navigation">
        <div className="page">
          <a href="/">
            <img className="logo" src="/static/images/cphjs.png" />
          </a>
          <Navigation/>
        </div>
      </header>
      <section className="page">{children}</section>
    </Layout>
  )
}
