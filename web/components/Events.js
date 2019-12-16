import React from 'react'
import { gql } from 'apollo-boost'
import Link from './Link'

export const Events = {
  tag: ({ events }) => {
    return (
      <div>
        <style jsx>{`
          .event {
            padding: 20px;
            margin-bottom: 10px;
          }
          .event h2 {
            margin: 0;
          }
        `}</style>
        {events.map(event => (
          <div className="event">
            <h2>{event.title}</h2>
            <div>
              {new Date(parseInt(event.date)).toDateString()} - {event.location}
            </div>
            <div>{event.content.replace(/#/gm, '').slice(0, 200)} ...</div>
            <Link href="" size="small">
              Read more
            </Link>
          </div>
        ))}
      </div>
    )
  },
  fragment: gql`
    fragment events on Event {
      title
      date
      markdown
      location
    }
  `
}
