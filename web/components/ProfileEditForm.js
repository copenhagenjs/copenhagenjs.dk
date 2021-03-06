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
    website: '',
    favorites: []
  },
  onSubmit
}) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [image, setImage] = useState('')
  const [githubId, setGithubId] = useState('')
  const [twitterId, setTwitterId] = useState('')
  const [instagramId, setInstagramId] = useState('')
  const [website, setWebsite] = useState('')
  const [favorites, setFavorites] = useState('')
  const validateUsername = val => {
    if (val.includes('/')) {
      alert('It should just be your username, not the url :)')
    }
  }
  const fields = [
    ['Full name', name, setName],
    ['Username - min. 8 Characters', username, setUsername],
    ['Image URL', image, setImage],
    ['Github username', githubId, setGithubId, validateUsername],
    ['Twitter username', twitterId, setTwitterId, validateUsername],
    ['Instagram username', instagramId, setInstagramId, validateUsername],
    ['Website URL', website, setWebsite],
    [
      'Favorite technologies and frameworks (comma seperated)',
      favorites,
      setFavorites
    ]
  ]
  useEffect(() => {
    setName(defaultValues.name)
    setUsername(defaultValues.username)
    setImage(defaultValues.image)
    setGithubId(defaultValues.githubId)
    setTwitterId(defaultValues.twitterId)
    setInstagramId(defaultValues.instagramId)
    setWebsite(defaultValues.website)
    setFavorites(defaultValues.favorites.join(', '))
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
          onSubmit({
            name,
            username,
            image,
            githubId,
            twitterId,
            instagramId,
            website,
            favorites: favorites.split(',').map(i => i.trim())
          })
        }}
      >
        Update Profile
      </Button>
    </>
  )
}
