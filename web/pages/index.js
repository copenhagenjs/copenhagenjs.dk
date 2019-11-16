import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import 'isomorphic-unfetch'
import { gql } from 'apollo-boost'
import { client } from '../services/graphql.js'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import Layout from '../components/Layout'
import Map from '../components/Map'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Event from '../components/Event'
import Attendance from '../components/Attendance'
import { Attendees } from '../components/Attendees'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import { initFirebase, redirectToLogin } from '../services/firebase.js'

const ATTEND_EVENT = gql`
  mutation AttendEvent($eventSlug: String!, $status: AttendanceStatus) {
    attendEvent(input: { eventSlug: $eventSlug, status: $status }) {
      status
      event {
        title
      }
    }
  }
`
const ATTENDING = gql`
  {
    events(first: 1, status: UPCOMING) {
      title
      slug
      attendance {
        status
      }
    }
  }
`

const EVENTS = gql`
  {
    events(first: 1, status: UPCOMING) {
      title
      slug
      date
      link
      content
      location
      presentations {
        title
        name
      }
      attendees {
        user {
          ...Attendees
        }
      }
    }
  }
  ${Attendees.fragment}
`

function EventGraph() {
  const [token, setToken] = useState('')
  const [attendance, setAttendance] = useState('INIT')
  const [attendEvent, { attendEventData }] = useMutation(ATTEND_EVENT, {
    context: {
      headers: {
        authorization: 'bearer ' + token
      }
    },
    onCompleted(data) {
      if (data.attendEvent.status) {
        setAttendance(data.attendEvent.status)
      }
    }
  })
  const { loading, error, data } = useQuery(EVENTS)
  const [getAttendanceStatus, attendanceMeta] = useLazyQuery(ATTENDING, {
    context: {
      headers: {
        authorization: 'bearer ' + token
      }
    },
    onCompleted(data) {
      if (
        data.events &&
        data.events.length !== 0 &&
        data.events[0].attendance
      ) {
        setAttendance(data.events[0].attendance.status)
      }
    }
  })

  useEffect(() => {
    initFirebase()
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        const result = await user.getIdTokenResult()
        setToken(result.token)
      }
    })
  }, [])

  useEffect(() => {
    if (token !== '') {
      getAttendanceStatus()
    }
  }, [token])

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error :(</span>
  if (data.events.length === 0)
    return (
      <>
        <h1>No upcoming event yet!</h1>
        <p>The next event is coming up really soon!</p>
      </>
    )

  const {
    content,
    title,
    date,
    link,
    presentations,
    location,
    attendees
  } = data.events[0]

  return (
    <>
      <Event
        title={title}
        date={new Date(parseInt(date))}
        html={content}
        location={location}
        speakers={presentations}
        link={link}
        attendees={attendees}
      />
      {token.length > 0 && (
        <>
          <hr />
          <h2>Beta feature:</h2>
          <Attendance
            status={attendance}
            onClick={status => {
              setAttendance(status)
              if (token.length > 0) {
                attendEvent({
                  variables: { eventSlug: data.events[0].slug, status: status }
                })
              }
            }}
          />
        </>
      )}
    </>
  )
}

export default () => (
  <ApolloProvider client={client}>
    <Layout>
      <Head>
        <title>CopenhagenJS - a JavaScript meetup in Copenhagen</title>
      </Head>
      <header className="page-header master bg-grey" role="navigation">
        <Navigation />

        <img
          className="logo"
          src="/static/images/cphjs.png"
          alt="CopenhagenJS logo"
        />
        <h3>
          CopenhagenJS is a monthly meetup for people interested in JavaScript
          in Copenhagen.
        </h3>
      </header>
      <section className="page">
        <EventGraph />
      </section>
      <Footer />
    </Layout>
  </ApolloProvider>
)
