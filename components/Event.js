import Map from './Map'
import SpeakerSchedule from './SpeakerSchedule.js'

export default ({ title, date, html, location, speakers }) => {
  return (
    <div>
      <style jsx>{`
        .date {
          font-size: 1.5rem;
        }
        .description {
        }
        .description :global(img) {
          max-width: 100%;
        }
        .description :global(h1) {
          margin: 5px 0;
        }
      `}</style>
      <div className="date">{date && date.toLocaleString('da-DK')}</div>
      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
      {location ? <Map location={location} /> : ''}
      {speakers ? <SpeakerSchedule speakers={speakers} /> : ''}
    </div>
  )
}
