import React from 'react'
import { gql } from 'apollo-boost'
import Link from './Link'

export const Events = {
  tag: ({ events }) => {
    return (
      <div>
        <style jsx>{`
          .event {
            padding: 20px 0;
            margin-bottom: 10px;
          }
          .event h3 {
            margin: 0;
          }
        `}</style>
        {events.map(event => (
          <div className="event">
            <h3>{event.title}</h3>
            <div>
              {new Date(parseInt(event.date)).toDateString()} - {event.location}
            </div>
            <div>{event.content.replace(/#/gm, '').slice(0, 200)} ...</div>
            <Link href={event.selfLink} size="small">
              Read more
            </Link>
          </div>
        ))}
      </div>
    )
  },
  fragment: gql`
    fragment Events on Event {
      title
      date
      selfLink
      markdown
      location
      content
    }
  `
}
