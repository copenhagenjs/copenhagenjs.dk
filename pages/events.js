import Page from '../components/Page'
import data from '../_posts/_data.json'

export default () => {
  return (
    <Page>
      <h1>Events</h1>
      <div>
        You can find the newest meetups on{' '}
        <a href="https://www.meetup.com/copenhagenjs/">
          meetup.com/copenhagenjs
        </a>
      </div>
      <h3>Archive</h3>
      <ul>
        {data.posts.reverse().map((p, id) => (
          <li key={id}>
            <a href={`/archive/${p.replace('.md', '')}`}>{p}</a>
          </li>
        ))}
      </ul>
    </Page>
  )
}
