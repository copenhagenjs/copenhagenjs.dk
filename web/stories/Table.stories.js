import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Table from '../components/Table'

storiesOf('Table', module).add('Default', () => (
  <Table>
    <thead>
      <tr>
        <th>#</th>
        <th>Number</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <td>3</td>
        <td>4</td>
      </tr>
    </tbody>
  </Table>
))
