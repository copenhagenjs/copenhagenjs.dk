import marked from 'marked'
import Page from '../components/Page'

let text = `
# Ressources for learning JavaScript

We compiled a list of free ressources we think will help you learn JavaScript:

<h3> 1. freeCodeCamp </h3>

FreeCodeCamp is an interactive online learning platform designed to teach you everything web development related. 
JavaScript is the most popular language to learn on the platform and as such they have multiple tutorials and assignments
you can take for free.

<a href="https://www.freecodecamp.org/" target="_blank">Check it out here</a>

<h3> 2. Codecademy </h3>

`
export default () => {
  return (
    <Page>
      <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
    </Page>
  )
}
