import React from 'react'
import Head from 'next/head'

export default ({ children }) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CopenhagenJS</title>
        <link rel="icon" type="image/png" href="/static/images/logo.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,900"
          type="text/css"
        />
        <link rel="stylesheet" href="/static/stylesheets/style.css" />

        <meta
          property="og:image"
          content="https://copenhagenjs.dk/static/images/logo.png"
        />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="CopenhagenJS Feed - Subscribe to latest meetups"
          href="https://feed.copenhagenjs.dk/atom.xml"
        />
      </Head>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh'
        }}
      >
        {children}
      </div>
    </div>
  )
}
