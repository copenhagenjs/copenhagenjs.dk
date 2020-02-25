import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import PresentationDetails from "../components/PresentationDetails";

storiesOf('PresentationDetails', module).add('Default', () => (
  <PresentationDetails/>
))
