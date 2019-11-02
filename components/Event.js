import React from 'react'
import Map from './Map'
import SpeakerSchedule from './SpeakerSchedule.js'

export default ({ title, date, html, location, speakers, link }) => {
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
        .speaker-schedule {
          margin: 20px 0;
        }
      `}</style>
      <div className="date">{date && date.toLocaleString('da-DK')}</div>
      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
      <hr className="speaker-schedule" />
      {speakers ? (
        <div className="speaker-schedule">
          <SpeakerSchedule speakers={speakers} />
        </div>
      ) : (
        ''
      )}
      {location ? <Map location={location} /> : ''}
      {link ? (
        <>
          <hr style={{ margin: '20px 0' }} />
          <a className="next-meetup__button" href={link}>
            Sign up here!
          </a>
        </>
      ) : (
        ''
      )}
    </div>
  )
}
