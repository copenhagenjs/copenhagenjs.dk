import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { SpeakerProfile } from '../components/SpeakerProfile'

const presentations = [{
  event: { selfLink: 'http://example.com', date: Date.now().toString(), slug: "event-slug" },
  title: 'Example',
  slug: 'example'
}]

storiesOf('SpeakerProfile', module)
  .add('No talks', () => <SpeakerProfile name={'Donald Duck'}></SpeakerProfile>)
  .add('1 talk', () => (
    <SpeakerProfile
      name={'Donald Duck'}
      presentations={presentations}
    ></SpeakerProfile>
  ))
  .add('1 talk - 1 youtube', () => (
    <SpeakerProfile
      name={'Donald Duck'}
      presentations={presentations}
      videos={[{ video: 'dQw4w9WgXcQ' }]}
    ></SpeakerProfile>
  ))
