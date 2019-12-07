import React from 'react'
import { gql } from 'apollo-boost'

export const UserEventFeed = {
  tag: ({ events }) => (
    <div>
      <h2>Events</h2>
      <div>
        {events.map(event => (
          <div>{event.title}</div>
        ))}
      </div>
    </div>
  ),
  fragment: gql`
    fragment UserEventFeed on Event {
      title
    }
  `
}
