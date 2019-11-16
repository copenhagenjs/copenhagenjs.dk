import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import TextInput from '../components/TextInput'

storiesOf('Text Input', module).add('Default', () => (
  <TextInput label="Default" name="default" onChange={action('changed')} />
))
