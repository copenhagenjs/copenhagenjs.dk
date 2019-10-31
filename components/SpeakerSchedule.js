import React from 'react'

export default ({ speakers }) => (
  <div>
    Schedule:
    <ul>
      {speakers.map(s => (
        <li>
          {s.title} - {s.name}
        </li>
      ))}
    </ul>
  </div>
)
