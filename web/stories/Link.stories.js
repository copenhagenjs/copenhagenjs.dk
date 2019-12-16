import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Link from '../components/Link'

storiesOf('Link', module)
  .add('Small button', () => (
    <Link size="sm" onClick={action('clicked')}>
      Small button
    </Link>
  ))
  .add('Large button', () => (
    <Link size="lg" onClick={action('clicked')}>
      Large button
    </Link>
  ))
