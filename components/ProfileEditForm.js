import React from 'react'

export const ProfileEditForm = ({
  name,
  setName,
  githubId,
  setGithubId,
  onSubmit
}) => (
  <>
    <div>
      <TextInput
        required
        type="text"
        label="Name:"
        name="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </div>
    <div>
      <TextInput
        required
        type="text"
        label="GitHub:"
        name="github"
        value={githubId}
        onChange={e => setGithubId(e.target.value)}
      />
    </div>
    <Button
      type="button"
      display="block"
      size="lg"
      margin="20px 0"
      onClick={() => {
        onSubmit()
      }}
    >
      Update Profile
    </Button>
  </>
)
