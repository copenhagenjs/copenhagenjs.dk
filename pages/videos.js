import React from 'react'
import Page from '../components/Page'
import { videos } from '../data/videos.js'

const Embed = ({ youtubeId }) => {
  return (
    <div
      className="video"
      style={{
        position: 'relative',
        paddingBottom: '56.25%' /* 16:9 */,
        paddingTop: 25,
        height: 0
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
        src={`https://www.youtube.com/embed/${youtubeId}`}
        frameBorder="0"
      />
    </div>
  )
}

export default class Videos extends React.Component {
  render() {
    return (
      <Page>
        <h1>Videos</h1>
        <p>
          <a href="https://www.youtube.com/channel/UCOD8lwED5PAcgmhwymQJsng">
            Subscribe to us on Youtube
          </a>
        </p>
        <p>
          {videos.reverse().map(([id, title]) => {
            return (
              <>
                <h3>{title}</h3>
                <Embed youtubeId={id} />
              </>
            )
          })}
        </p>
      </Page>
    )
  }
}
