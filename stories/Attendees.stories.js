import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Attendees } from '../components/Attendees'

storiesOf('Attendees', module).add('Default', () => {
  const users = [{ name: 'Batman', image: 'https://i.imgur.com/quTEcgF.png' }]
    .flatMap(i => [i, i])
    .flatMap(i => [i, i])
  return <Attendees.tag attendees={users}></Attendees.tag>
})
