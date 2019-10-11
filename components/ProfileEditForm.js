import React, { useState, useEffect } from 'react'
import TextInput from './TextInput.js'
import Button from './Button.js'

export const ProfileEditForm = ({
  defaultValues = {
    name: '',
    image: '',
    githubId: '',
    twitterId: '',
    instagramId: '',
    website: ''
  },
  onSubmit
}) => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [githubId, setGithubId] = useState('')
  const [twitterId, setTwitterId] = useState('')
  const [instagramId, setInstagramId] = useState('')
  const [website, setWebsite] = useState('')
  const validateUsername = val => {
    if (val.includes('/')) {
      alert('It should just be your username, not the url :)')
    }
  }
  const fields = [
    ['Full name', name, setName],
    ['Image URL', image, setImage],
    ['Github username', githubId, setGithubId, validateUsername],
    ['Twitter username', twitterId, setTwitterId, validateUsername],
    ['Instagram username', instagramId, setInstagramId, validateUsername],
    ['Website URL', website, setWebsite]
  ]
  useEffect(() => {
    setName(defaultValues.name)
    setImage(defaultValues.image)
    setGithubId(defaultValues.githubId)
    setTwitterId(defaultValues.twitterId)
    setInstagramId(defaultValues.instagramId)
    setWebsite(defaultValues.website)
  }, [defaultValues.name])

  return (
    <>
      {fields.map(f => (
        <div key={f[0]}>
          <TextInput
            required
            type="text"
            label={f[0] + ':'}
            name={f[0]}
            value={f[1]}
            onChange={e => {
              if (f[3]) f[3](e.target.value)
              f[2](e.target.value)
            }}
          />
        </div>
      ))}

      <Button
        type="button"
        display="block"
        size="lg"
        margin="20px 0"
        onClick={() => {
          onSubmit({ name, image, githubId, twitterId, instagramId, website })
        }}
      >
        Update Profile
      </Button>
    </>
  )
}
