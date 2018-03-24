import Layout from '../components/Layout'

export default () => {
  return (
    <Layout>
      <header class="page-header bg-grey" role="navigation">
        <div class="page">
          <a href="/">
            <img class="logo" src="/static/images/cphjs.png" />
          </a>

          <ul class="navigation">
            <li>
              <a class="btn-white" href="/events/">
                All events
              </a>
            </li>
            <li>
              <a class="btn-white" href="/media/">
                Photos & Video
              </a>
            </li>
            <li>
              <a class="btn-white" href="/about/">
                About
              </a>
            </li>
          </ul>
        </div>
      </header>

      <section class="page">Events</section>
    </Layout>
  )
}
