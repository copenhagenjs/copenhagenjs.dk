import marked from 'marked'
import Page from '../components/Page'

let text = `
# About CopenhagenJS

CopenhagenJS is a JavaScript user group in Copenhagen and the Öresund region. On the third thursday of every month we meet and share our knowledge, enthusiasm and war stories with each other.

### How does a CopenhagenJS run?

A wide range of backgrounds are represented in the group, from occasional users to JavaScript and front end experts. Everyone with an interest in JavaScript is welcome.

In a typical meeting, we start at 18:00. There's a quick introduction, everyone grabs a drink of some sort. After that we usually have 3 talks of 20-25 minutes.

Previous topics include:

* Demos of projects, big and small, built by community members
* JavaScript fundamentals
* Data structures in JavaScript
* Use of specific JavaScript libraries
* Use of HTML5 apis
* Use of CSS3 features
* Game programming with WebGL
* Robots!

See our [previous speakers list](/speakers).

Usually the meeting ends at around 21:00.

If you're interested in attending a meeting, we'd appreciate an indication on the [Meetup page](https://www.meetup.com/copenhagenjs/), so we can get an idea of the requirements for the venue in terms of chairs, drinks, etc.

### How do I host a CopenhagenJS meetup?

We've put together a little checklist, of things to keep in mind when hosting a CopenhagenJS meeting.

* Respond to a call for venue sooner, rather than later
* Be sure you have enough room for the meetup. Current size is around 70-90 per meeting
* Make your venue easy to find
   * Supply links to map services with pointers placed correctly
   * Put up signs/posters on location to guide participants
* Have your presentation setup ready and tested in advance
   * HDMI Projector
   * HDMI cable
   * Power outlet for speaker's laptop, bonus points for outlets for participants
   * Possibly power supply for laptops, Macs are popular
* Drinks, snacks
   * Beer, sodas, tea and coffee are greatly appreciated
   * Snacks are popular, but not required
   * Minimum requirement is tap water, so don't be intimidated
* Presentation of the host
   * Welcome to the venue
   * Who are you and what do you work with?
   * Where are the bathrooms?
   * Food/drinks?
* Cleanup should be fast. The organisers will ask participants to help with tidying up, and will participate themselves.

If you need help organising drinks, cables, put out chairs, etc, just let the organisers know in advance, and we'll find a way to make it happen.

### Where can I find your logo?

Signage helps people find your building, floor or office if you aren't located somewhere completely obvious. We encourage you to make use of our logo and put up signage in relevant places to give our attendees some breadcrumbs to follow.

Download our logo here: [PNG](/static/images/cphjs.png)

### How do I contact you?

Feel free to write to us at <hi@copenhagenjs.dk>, or on [@copenhagenjs](http://twitter.com/copenhagenjs), if you have questions, want to host, or simply wanna talk.

### Do you want to help?

We really appreciate everyone that wants to help out at CopenhagenJS, please reach out online or during the meetup.

We are looking for help with:
- finding new venues for upcoming meetups
- finding speakers that has something they want to share
- helping organzing the raffle/quiz

We, the organizers, try to meet once a month to talk about upcoming meetups (but we also hang out and just talk) 😄

You can also help out on the website, you can find the Github repo here https://github.com/copenhagenjs/copenhagenjs.dk

The website can always be improved and we highlight all contributions at the next meetup, so there is a big potential to do something that will have a impact to many people.

### Group Photos

Here are links to all groups photos we have taken:

- June: https://photos.app.goo.gl/yX9Kf6xW6RCmtHwY9
- July: https://photos.app.goo.gl/9UtgpFa6upRZvcjY7
- August: https://photos.app.goo.gl/YSFCUH2ypm1SAbrSA
- September: https://photos.app.goo.gl/XyLydVj61KR4fqrQ9
- October: https://photos.app.goo.gl/MV7L1c2gkewyB854A

### More

We wrote a bit about giving a presentation and tips & tricks.

- [Speaker Guidelines](/guidelines)
- [Learn](/learn)
- Our [Code of Conduct](/code-of-conduct)

`

export default () => {
  return (
    <Page>
      <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
    </Page>
  )
}
