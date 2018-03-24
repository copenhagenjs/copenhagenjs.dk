import Head from 'next/head'

export default ({ children }) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CopenhagenJS</title>
        <link
          rel="stylesheet"
          href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,900"
          type="text/css"
        />
        <link rel="stylesheet" href="/static/stylesheets/style.css" />

        <meta
          property="og:image"
          content="http://copenhagenjs.dk/static/images/logo.png"
        />
        <link
          href="/atom.xml"
          type="application/atom+xml"
          rel="alternate"
          title="CopenhagenJS ATOM Feed"
        />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
      </Head>
      <div>
        {children}
        <script async src="//platform.twitter.com/widgets.js" />
        <script
          async
          src="//connect.facebook.net/en_US/all.js#xfbml=1&appId=423774561071001"
        />
      </div>
    </div>
  )
}
