import marked from 'marked'
import Page from '../components/Page'

let text = `
# Learn JavaScript

We compiled a list of free ressources we think will help you learn JavaScript:

### 1. freeCodeCamp

FreeCodeCamp is an interactive online learning platform designed to teach you everything web development related. 
JavaScript is the most popular language to learn on the platform, and as such, they have multiple tutorials and assignments
you can take for free.

<a href="https://www.freecodecamp.org/" target="_blank">Check out freeCodeCamp </a>

### 2. Codecademy 

Codecademy is like freeCodeCamp, also an interactive platform that offers free coding classes in 12 different programming languages, including Javascript. It's a great starting point if it's your first time learning JS. They do, however, have some paid courses, but most of their programming beginner courses are free. 

<a href="https://www.codecademy.com" target="_blank">Check out Codecademy </a>

`
export default () => {
  return (
    <Page>
      <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
    </Page>
  )
}
