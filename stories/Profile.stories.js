import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ProfileEditForm } from '../components/ProfileEditForm.js'

storiesOf('Profile', module)
  .add('Empty form', () => (
    <ProfileEditForm {...{ onSubmit: action('sending') }}></ProfileEditForm>
  ))
  .add('Filled out form', () => (
    <ProfileEditForm
      {...{
        name: 'Donald',
        setName: action('setName'),
        githubId: 'donald09',
        setGithubId: action('setGithubId'),
        onSubmit: action('sending')
      }}
    ></ProfileEditForm>
  ))
