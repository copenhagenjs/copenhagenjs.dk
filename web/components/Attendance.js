import React, { useState } from 'react'
import Button from './Button'

export default ({ status, onClick }) => {
  const [editState, setEditState] = useState(false)
  const editButton = (
    <div>
      <Button
        onClick={() => {
          console.log({ editState, test: !editState })
          setEditState(!editState)
        }}
      >
        {editState ? 'Cancel' : 'Edit'}
      </Button>
    </div>
  )
  const handler = status => {
    setEditState(false)
    onClick(status)
  }
  switch (status) {
    case 'INIT':
      return (
        <div>
          <Button onClick={() => handler('GOING')}>I want to attend!</Button>
        </div>
      )
    case 'GOING':
      return (
        <div>
          <div>You are going!</div>
          {editButton}
          {editState && (
            <Button onClick={() => handler('NOTGOING')}>I can't attend!</Button>
          )}
        </div>
      )
    case 'NOTGOING':
      return (
        <div>
          <div>You are not going!</div>
          {editButton}
          {editState && (
            <Button onClick={() => handler('GOING')}>I want to attend!</Button>
          )}
        </div>
      )
    case 'WAITLIST':
      return (
        <div>
          <div>You are on the waitlist!</div>
          {editButton}
          {editState && (
            <Button onClick={() => handler('NOTGOING')}>I can't attend.</Button>
          )}
        </div>
      )
    default:
      return <div>Error</div>
  }
}
