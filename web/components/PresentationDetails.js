import React from 'react'

export default ({ details }) => (
  <div>
    <h2>Notes and links from this presentation</h2>
    <ul>
      {details.map(detail => (
        <li>
          {detail.text} - <a href={detail.link}>{detail.link}</a>
        </li>
      ))}
    </ul>
  </div>
)
