import React from 'react'
import { gql } from 'apollo-boost'

export const PresentationDetails = {
  tag: ({ details }) => (
    <div>
      <h3>Notes and links from this presentation</h3>
      <ul>
        {details.map(detail => (
          <li>
            {detail.text} - <a href={detail.link}>{detail.link}</a>
          </li>
        ))}
      </ul>
    </div>
  ),
  fragment: gql`
    fragment PresentaionDetailsList on PresentationDetail {
      text
      link
    }
  `
}
