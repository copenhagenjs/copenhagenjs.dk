import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { SpeakerProfile } from '../components/SpeakerProfile'

storiesOf('SpeakerProfile', module)
  .add('No talks', () => <SpeakerProfile name={'Donald Duck'}></SpeakerProfile>)
  .add('1 talk', () => (
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
  .add('1 talk - 1 youtube', () => (
    <SpeakerProfile
      name={'Donald Duck'}
      presentations={[
        {
          event: { link: 'http://example.com', date: Date.now().toString() },
          title: 'Example'
        }
      ]}
      videos={[{ video: 'dQw4w9WgXcQ' }]}
    ></SpeakerProfile>
  ))
