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
  ]
]

export default class Videos extends React.Component {
  render() {
    return (
      <Page>
        <h1>Videos</h1>
        <p>
          <a href="https://www.youtube.com/channel/UCOD8lwED5PAcgmhwymQJsng?view_as=subscriber">
            Subscribe to us on Youtube
          </a>
        </p>
        <p>
          {videos.reverse().map(([id, title]) => {
            return (
              <>
                <h3>{title}</h3>
                <iframe
                  width="560"
                  height="315"
                  src={'https://www.youtube.com/embed/' + id}
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
              </>
            )
          })}
        </p>
      </Page>
    )
  }
}
