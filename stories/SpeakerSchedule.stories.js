import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SpeakerSchedule from '../components/SpeakerSchedule'

storiesOf('SpeakerSchedule', module).add('Default', () => <SpeakerSchedule />)
