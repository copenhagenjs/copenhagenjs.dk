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
        defaultValues: {
          name: 'name',
          username: 'username',
          image: 'image',
          githubId: 'githubId',
          twitterId: 'twitterId',
          instagramId: 'instagramId',
          website: 'website',
          favorites: ['javascript', 'html']
        },
        onSubmit: action('sending')
      }}
    ></ProfileEditForm>
  ))
