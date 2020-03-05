import 'isomorphic-unfetch'
import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { client } from '../services/graphql.js'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Page from '../components/Page'
import { getParams } from '../services/url'
import { PresentationDetails } from '../components/PresentationDetails'
import { firebaseLogin } from '../services/firebase.js'
import TextInput from '../components/TextInput'
import Button from '../components/Button'

const ADD_PRESENTATION_DETAIL = gql`
  mutation AddPresentationDetail($input: PresentationDetailInput!) {
    addPresentationDetail(input: $input) {
      text
      link
    }
  }
`

function Presentation() {
  const [text, setText] = useState('')
  const [link, setLink] = useState('')
  const [token, setToken] = useState('')

  const { loading, error, data } = useQuery(
    gql`
      query Presentations($eventslug: String!, $titleslug: String!) {
        presentation(eventslug: $eventslug, titleslug: $titleslug) {
          title
          details {
            ...PresentaionDetailsList
          }
        }
      }
      ${PresentationDetails.fragment}
    `,
    {
      variables: {
        eventslug: getParams().get('event'),
        titleslug: getParams().get('title')
      }
    }
  )

  useEffect(() => {
    firebaseLogin()
      .then(newToken => {
        setToken(newToken)
      })
      .catch(e => {
        console.log('It is okay', e)
      })
  }, [])

  const [
    addPresentationDetail,
    { data: detailData, loading: mutationLoading, error: mutationError }
  ] = useMutation(ADD_PRESENTATION_DETAIL, {
    context: {
      headers: {
        authorization: 'bearer ' + token
      }
    }
  })

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>

  return (
    <div>
      {data.presentation.title}
      <PresentationDetails.tag details={data.presentation.details} />
      <div>
        <h3>Add link/note to this presentation</h3>
        <TextInput
          label="Description:"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <TextInput
          label="Link:"
          type="text"
          value={link}
          onChange={e => setLink(e.target.value)}
        />
        {token !== '' && (
          <Button
            onClick={() => {
              addPresentationDetail({
                variables: {
                  input: {
                    eventslug: getParams().get('event'),
                    titleslug: getParams().get('title'),
                    link,
                    text
                  }
                }
              })
            }}
          >
            Add Detail
          </Button>
        )}
      </div>
    </div>
  )
}

export default () => (
  <ApolloProvider client={client}>
    <Page>
      <h1>Presentation</h1>
      <Presentation />
    </Page>
  </ApolloProvider>
)
