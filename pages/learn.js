import marked from 'marked'
import Page from '../components/Page'

let text = `
# Learn JavaScript

We have compiled a list of resources we think will help you learn JavaScript:

### 1. freeCodeCamp

FreeCodeCamp is an interactive online learning platform designed to teach you everything web development related.
JavaScript is the most popular language to learn on the platform, and as such, they have multiple tutorials and assignments you can take for free.

<a href="https://www.freecodecamp.org/" target="_blank">Check out freeCodeCamp </a>

### 2. Codecademy

Codecademy is like freeCodeCamp, also an interactive platform that offers free coding classes in 12 different programming languages, including Javascript. It's a great starting point if it's your first time learning JS. They do, however, have some paid courses, but most of their programming beginner courses are free.

<a href="https://www.codecademy.com" target="_blank">Check out Codecademy </a>

### 3. Frontend Masters
Frontend Masters is an online platform offering courses and workshops from leading practitioners in the web development industry. Users can follow courses in the form of Learning Paths based on the their skill level or specific areas of interest. Although it is a subscription-based learning platform (currently USD 39 per month), they are partners in the GitHub Student Pack program through which verified students get free access to the platform for a six month period.

<a href='https://frontendmasters.com/welcome/github-student-developers/' target= '_blank' rel="noreferrer nofollow">Check out Frontend Masters - GitHub Student Pack</a>

### 4. Lynda - JavaScript Essential Training
Lynda is an online platform offering courses in software, creative, and business skills. Their course JavaScript Essential Training offers a good introduction to the language. In addition, there are numerous other courses on JavaScript and related technologies.
Lynda is also a subscription-based platform but they offer a one month free trial which is more than enough to cover this course.

<a href='https://www.lynda.com/JavaScript-tutorials/JavaScript-Essential-Training/574716-2.html' target= '_blank' rel="noreferrer nofollow">Check out Lynda - JavaScript Essential Training</a>

### 5. Treehouse - JavaScript
Treehouse offers video courses together with interactive exercises to reinforce the concepts covered. They offer a JavaScript Beginner's Track which covers the basics of the language, some ES6, and basics of DOM manipulation.
Treehouse is also a subscription-based platform (currently USD 25 per month) but they offer a 7-day free trial which should be enough to complete the beginner's track.

<a href='https://teamtreehouse.com/tracks/beginning-javascript' target= '_blank' rel="noreferrer nofollow">Check out Treehouse - Beginning JavaScript</a>

### 6. Udemy - Web Developer Bootcamp
Colt Steele is a coding bootcamp instructor in the US and the author of this very popular Udemy course on web development. In this course, among other web technologies, he teaches the basics of JavaScript and then goes on to show how it is used for frontend and backend web development.
This is also a paid course.

<a href='https://www.udemy.com/course/the-web-developer-bootcamp/' target= '_blank' rel="noreferrer nofollow">Check out Colt Steele's Web Developer Bootcamp</a>

### 7. YouTube - The Net Ninja
Although YouTube is full of JavaScript tutorials, not all of them are of a good quality. This particular channel, however, created by Shaun Pelling  has been offering very well-structured and high quality tutorials on web development including JavaScript.

<a href='https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg/playlists' target= '_blank' rel="noreferrer nofollow">Check out The Net Ninja's courses on YouTube</a>

### 8. W3Schools - JavaScript
W3Schools offers tutorials and references on web technologies including JavaScript. The site derives its name from the World Wide Web (W3), but is not affiliated with the W3C. The site is aimed at beginner web developers and the examples on the site are usually simplified to improve reading and basic understanding.

<a href='https://www.w3schools.com/js/default.asp' target= '_blank' rel="noreferrer nofollow">Check out JavaScript resources on W3Schools</a>

### 9. MDN Web Docs
MDN Web Docs is an accurate and credible platform extensively used by industry practitioners as a reference on topics related to web technologies. Among many other resources, they also offer a learning path for beginners on JavaScript.

<a href='https://developer.mozilla.org/en-US/docs/Learn/JavaScript' target= '_blank' rel="noreferrer nofollow">Check out MDN's JavaScript Learning Path</a>

### 10. Books
<ul>
<li><a href='http://speakingjs.com' target='_blank' rel="noreferrer nofollow">Axel Rauschmayer - Speaking JavaScript</a></li>

<li><a href='https://www.amazon.co.uk/Professional-JavaScript-Developers-Matt-Frisbie/dp/1119366445/ref=dp_ob_title_bk'  target='_blank' rel="noreferrer nofollow">Nicholas Zakas - Professional JavaScript for Web Developers</a> - 4th Edition available on 11 Dec 2019</li>
</ul>
`
export default () => {
  return (
    <Page>
      <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
    </Page>
  )
}
