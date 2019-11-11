import React from 'react'
import { gql } from 'apollo-boost'

export const Attendees = {
  tag: ({ attendees }) => {
    return (
      <div className="attendees">
        <style jsx>{`
          .attendees {
            display: flex;
          }
          .image-container {
            margin: 0 5px 5px 0;
            width: 50px;
            height: 50px;
            overflow: hidden;
          }
          .image {
            max-width: 50px;
          }
        `}</style>
        {attendees.map(user => {
          return (
            <div className="image-container">
              <img alt={user.name} className="image" src={user.image} />
            </div>
          )
        })}
      </div>
    )
  },
  fragment: `
    fragment Attendees on User {
      name
      image
    }
  `
}
