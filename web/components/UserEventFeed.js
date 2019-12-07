import React from 'react'
import { gql } from 'apollo-boost'

export const UserEventFeed = {
  tag: ({ events }) => (
    <div>
      <ul>
        {events.map(event => (
          <li>{event.title}</li>
        ))}
      </ul>
    </div>
  ),
  fragment: gql`
    fragment UserEventFeed on Event {
      title
    }
  `
}
