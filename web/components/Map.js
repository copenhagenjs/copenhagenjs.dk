import React from 'react'

export default ({ location }) => (
  <div className="map" style={{ width: '100%' }}>
    <iframe
      width="100%"
      height="300"
      src={`https://maps.google.com/maps?width=100%&height=300&hl=en&q=${encodeURIComponent(
        location
      )}&ie=UTF8&t=&z=14&iwloc=B&output=embed`}
      frameBorder="0"
      scrolling="no"
    />
  </div>
)
