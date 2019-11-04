import marked from 'marked'
import Page from '../components/Page'

let text = `
# Learn JavaScript

We have compiled a list of resources we think will help you learn JavaScript:

### 1. freeCodeCamp

FreeCodeCamp is an interactive online learning platform designed to teach you everything web development related.
JavaScript is the most popular language to learn on the platform, and as such, they have multiple tutorials and assignments you can take for free.

<a href="https://www.freecodecamp.org/">Check out freeCodeCamp </a>

### 2. Codecademy

Codecademy is like freeCodeCamp, also an interactive platform that offers free coding classes in 12 different programming languages, including Javascript. It's a great starting point if it's your first time learning JS. They do, however, have some paid courses, but most of their programming beginner courses are free.

<a href="https://www.codecademy.com">Check out Codecademy </a>

### 3. Lynda - JavaScript Essential Training
Lynda is an online platform offering courses in software, creative, and business skills. Their course JavaScript Essential Training offers a good introduction to the language. In addition, there are numerous other courses on JavaScript and related technologies.
Lynda is also a subscription-based platform but they offer a one month free trial which is more than enough to cover this course.

<a href='https://www.lynda.com/JavaScript-tutorials/JavaScript-Essential-Training/574716-2.html'>Check out Lynda - JavaScript Essential Training</a>

### 4. Treehouse - JavaScript
Treehouse offers video courses together with interactive exercises to reinforce the concepts covered. They offer a JavaScript Beginner's Track which covers the basics of the language, some ES6, and basics of DOM manipulation.
Treehouse is also a subscription-based platform but they offer a 7-day free trial which should be enough to complete the beginner's track.

<a href='https://teamtreehouse.com/tracks/beginning-javascript'>Check out Treehouse - Beginning JavaScript</a>

### 5. MDN Web Docs
MDN Web Docs is an accurate and credible platform extensively used by industry practitioners as a reference on topics related to web technologies. Among many other resources, they also offer a learning path for beginners on JavaScript.

<a href='https://developer.mozilla.org/en-US/docs/Learn/JavaScript'>Check out MDN's JavaScript Learning Path</a>

### 6. Speaking JavaScript
This book is aimed at programmers who want to learn JavaScript quickly and properly, and JavaScript programmers who want to deepen their skills and/or look up specific topics. Dr. Axel Rauschmayer has written other books on JavaScript and also actively maintains a blog <a href='https://2ality.com'>2ality</a> where he writes mainly about JavaScript.
An HTML version of the book is available online for free.

<a href='http://speakingjs.com'>Check out Axel Rauschmayer's Speaking JavaScript</a>


### 7. Frontend Masters
This website has amazing video courses. It is subscription-based. However some previews are available. 
If you are a student you can get 6 months for free through the <a href="https://frontendmasters.com/welcome/github-student-developers/">GitHub Student Developer Pack.</a>. 

<a href='https://frontendmasters.com/learn/javascript/'>Check out Frontend Masters's JavaScript Learning Path</a>

`
export default () => {
  return (
    <Page>
      <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
    </Page>
  )
}
