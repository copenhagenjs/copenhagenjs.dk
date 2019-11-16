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
        {attendees.map((attendees, key) => {
          const image = (
            <img
              alt={attendees.user.name}
              title={attendees.user.name}
              className="image"
              src={attendees.user.image}
            />
          )
          return (
            <div className="image-container" key={key}>
              {attendees.user.twitterId !== null ? (
                <a href={'https://twitter.com/' + attendees.user.twitterId}>
                  {image}
                </a>
              ) : (
                image
              )}
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
      twitterId
    }
  `
}
