import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SpeakerSchedule from '../components/SpeakerSchedule'

storiesOf('SpeakerSchedule', module).add('Default', () => (
  <SpeakerSchedule
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
  />
))
