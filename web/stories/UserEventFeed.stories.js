import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { UserEventFeed } from '../components/UserEventFeed'

storiesOf('UserEventFeed', module).add('Default', () => (
  <UserEventFeed.tag
    events={[
      {
        title: 'First',
        attendance: {
          status: 'GOING'
        }
      }
    ]}
  />
))
