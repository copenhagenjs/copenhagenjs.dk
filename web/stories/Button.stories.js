import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from '../components/Button'

storiesOf('Button', module)
  .add('Small button', () => (
    <Button size="sm" onClick={action('clicked')}>
      Small button
    </Button>
  ))
  .add('Large button', () => (
    <Button size="lg" onClick={action('clicked')}>
      Large button
    </Button>
  ))
