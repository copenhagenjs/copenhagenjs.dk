import React from 'react'
import Layout from '../components/Layout'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default ({ children }) => {
  return (
    <Layout>
      <style jsx>{`
        .main {
          flex: 1;
          width: 100%;
        }
      `}</style>
      <header className="page-header bg-grey" role="navigation">
        <div className="page">
          <a href="/">
            <img className="logo" src="/static/images/cphjs.png" />
          </a>
          <Navigation />
        </div>
      </header>
      <section className="page main">{children}</section>
      <Footer />
    </Layout>
  )
}
