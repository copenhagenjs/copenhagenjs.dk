import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Event from '../components/Event'

storiesOf('Event', module).add('Default', () => (
  <Event
    html={`<div><h1>Title</h1>New Event</div>`}
    location={'Tivoli, Copenhagen'}
    speakers={[
      {
        name: 'Donald Duck',
        title: 'Welcome to Duckburg'
      },
      {
        name: 'Batman',
        title: 'How to program a bat-mobile'
      }
    ]}
  ></Event>
))
