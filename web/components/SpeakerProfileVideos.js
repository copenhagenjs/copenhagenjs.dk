import React from 'react'
import { gql } from 'apollo-boost'
import { Embed } from './YoutubeEmbed.js'

export const SpeakerProfileVideos = {
  tag: ({ videos }) => {
    if (videos.length === 0) return null
    return (
      <div style={{ margin: '0 0 20px' }}>
        <style jsx>{`
          .video {
            margin-bottom: 20px;
          }
          @media (min-width: 700px) {
            .videos {
              display: flex;
            }
            .video {
              width: 50%;
              margin: 0 20px 0 0;
            }
          }
        `}</style>
        Videos:
        <div className="videos">
          {videos.map(video => (
            <div className="video" key={video}>
              <Embed youtubeId={video.youtubeId} />
            </div>
          ))}
        </div>
      </div>
    )
  },
  fragment: gql`
    fragment SpeakerProfileVideos on Video {
      title
      youtubeId
    }
  `
}
