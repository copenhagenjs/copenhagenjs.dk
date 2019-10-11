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
  const fields = [
    ['Name', name, setName],
    ['Image', image, setImage],
    ['Github', githubId, setGithubId],
    ['Twitter', twitterId, setTwitterId],
    ['Instagram', instagramId, setInstagramId],
    ['Website', website, setWebsite]
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
            onChange={e => f[2](e.target.value)}
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
