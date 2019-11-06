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

export const SpeakerProfile = ({ name, presentations = [], user, videos }) => (
  <>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
      <div>
        {user && user.image && (
          <img
            src={user.image}
            width="200px"
            style={{ borderRadius: 100, float: 'left', marginRight: 30 }}
          />
        )}
      </div>
      <div>
        <h1>{name}</h1>
        <div>
          {name} have spoken at {presentations.length} CopenhagenJS event
          {presentations.length > 1 ? 's' : ''}.
        </div>
        <ul style={{ margin: '20px 0 0' }}>
          {user && user.twitterId && (
            <li>
              <a href={`https://twitter.com/${user.twitterId}`}>Twitter</a>
            </li>
          )}
          {user && user.githubId && (
            <li>
              <a href={`https://github.com/${user.githubId}`}>Github</a>
            </li>
          )}
          {user && user.website && (
            <li>
              <a href={user.website}>Website</a>
            </li>
          )}
        </ul>
      </div>
    </div>
    <SpeakerProfileVideos.tag videos={videos} />
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {presentations.reverse().map(presentation => {
          const date = new Date(parseInt(presentation.event.date))
          return (
            <tr key={presentation.title}>
              <td>
                {date
                  .getDate()
                  .toString()
                  .padStart(2, '0')}
                /{(date.getMonth() + 1).toString().padStart(2, '0')}/
                {date.getFullYear()}
              </td>
              <td>
                <a href={presentation.event.selfLink}>{presentation.title}</a>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </>
)
