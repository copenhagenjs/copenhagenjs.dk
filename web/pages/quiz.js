import 'isomorphic-unfetch'
import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { ApolloProvider, useLazyQuery, useMutation } from '@apollo/react-hooks'
import ApolloClient, { gql } from 'apollo-boost'
import Page from '../components/Page'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { initFirebase, redirectToLogin } from '../services/firebase.js'

const client = new ApolloClient({
  uri: 'https://graphql.copenhagenjs.dk/graphql'
})

export default () => {
  const [token, setToken] = useState('')
  const [answer, setAnswer] = useState('')

  const [
    submitQuiz,
    { data: quizData, loading: mutationLoading, error: mutationError }
  ] = useMutation(
    `
    mutation UpdateQuiz($input: String!) {
      submitQuiz(answer: $input)
    }
    `,
    {
      context: {
        headers: {
          authorization: 'bearer ' + token
        }
      }
    }
  )

  useEffect(() => {
    initFirebase()
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        const result = await user.getIdTokenResult()
        setToken(result.token)
      } else {
        // No user is signed in.
        redirectToLogin()
      }
    })
  }, [])

  return (
    <Page>
      <h1>Quiz</h1>
      <TextInput
        required
        label="Title"
        name="title"
        value={answer}
        onChange={e => {
          setAnswer(e.target.value)
        }}
      />
      <Button
        onClick={() => {
          submitQuiz({
            variables: {
              input: answer
            }
          })
        }}
        type="submit"
        display="block"
        size="lg"
        margin="20px 0"
      >
        Send
      </Button>
      {quizData && quizData.submitQuiz}
    </Page>
  )
}
