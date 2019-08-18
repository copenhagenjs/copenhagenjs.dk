import React from 'react'
import Page from '../components/Page'

const videos = [
  [
    'Zu8P6xejHuU',
    'Shape your workflows with custom eslint plugins - Peter Müller'
  ],
  [
    'HYqxc_zjqMg',
    'Micro:bit - JavaScript meets microcontroller - Kenneth Geisshirt'
  ],
  ['VNoDZihhWHI', 'GraphQL and React Suspense - Morten Barklund'],
  [
    '2BYKskAt4rY',
    'Automatically calculating your own CO2 footprint - Olivier Corradi'
  ],
  ['GUkgcHuhh5k', 'Intelligent use of Electricity - Christophe Lephilibert'],
  [
    '3plpHThSyXU',
    'How to support Web Components across browsers with 1 line of code - Frederik Wessberg'
  ],
  [
    'z7utiFdXgFg',
    'Building framework agnostic UI components - Andreas Mehlsen'
  ],
  [
    'iFKkz6_6WV8',
    'How we maintain more than 250 Web Components - Rune Mehlsen'
  ],
  ['tty9txryOgA', 'Power of Hackathons - André Kovac & Cem Turan'],
  [
    'keOPXD-ojWY',
    'What can a javascript developer do to combat climate change? - Olivier Corradi'
  ],
  [
    'fO7evPNRZy4',
    'A journey => A developer - Zoey Zou'
  ]
]

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
