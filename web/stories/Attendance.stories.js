import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Attendance from '../components/Attendance'

storiesOf('Attendance', module)
  .add('Default', () => (
    <Attendance status={'INIT'} onClick={action('INIT')}></Attendance>
  ))
  .add('Going', () => (
    <Attendance status={'GOING'} onClick={action('GOING')}></Attendance>
  ))
  .add('Not going', () => (
    <Attendance status={'NOTGOING'} onClick={action('NOTGOING')}></Attendance>
  ))
  .add('Waistlist', () => (
    <Attendance status={'WAITLIST'} onClick={action('WAITLIST')}></Attendance>
  ))
