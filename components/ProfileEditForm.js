import React, { useState } from 'react'
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
  const [name, setName] = useState(defaultValues.name)
  const [image, setImage] = useState(defaultValues.image)
  const [githubId, setGithubId] = useState(defaultValues.githubId)
  const [twitterId, setTwitterId] = useState(defaultValues.twitterId)
  const [instagramId, setInstagramId] = useState(defaultValues.instagramId)
  const [website, setWebsite] = useState(defaultValues.website)
  const fields = [
    ['Name', name, setName],
    ['Image', image, setImage],
    ['Github', githubId, setGithubId],
    ['Twitter', twitterId, setTwitterId],
    ['Instagram', instagramId, setInstagramId],
    ['Website', website, setWebsite]
  ]
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
