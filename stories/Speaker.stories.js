import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { SpeakerProfile } from '../pages/speaker'

storiesOf('SpeakerProfile', module).add('No talks', () => (
  <SpeakerProfile name={'Donald Duck'}></SpeakerProfile>
))
storiesOf('SpeakerProfile', module).add('1 talk', () => (
  <SpeakerProfile
    name={'Donald Duck'}
    presentations={[
      {
        event: { link: 'http://example.com', date: Date.now().toString() },
        title: 'Example'
      }
    ]}
  ></SpeakerProfile>
))
