import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import TextArea from '../components/TextArea'

storiesOf('Text Area', module).add('Default', () => (
  <TextArea label="Default" name="default" onChange={action('changed')} />
))
