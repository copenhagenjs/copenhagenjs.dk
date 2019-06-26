import Page from '../components/Page'
import speakerEvents from '../static/speakers.json'

export default () => {

  const speakerList = speakerEvents.map((event, id) => {
    return event.speakers.map(speaker => {
      return <li key={`${id}-${speaker.name}`}>
        <a href={`/archive/${event.src.replace('.md', '')}`}>
          {speaker.name}
        </a>
      </li>
    });
  });

  return (
    <Page>
      <h1>Speakers</h1>
      <p>These speakers have previously given talks at copenhagen.js:</p>
      <ul>
        {speakerList.flat()}
      </ul>
    </Page>
  )
}

