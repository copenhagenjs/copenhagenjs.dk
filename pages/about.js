import marked from 'marked';
import Page from '../components/Page';

let text = `
# About CopenhagenJS

CopenhagenJS is a JavaScript user group in Copenhagen and the Öresund region. On the third thursday of every month we meet and share our knowledge, enthusiasm and war stories with each other.

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
`;
export default () => {
  return (
    <Page>
      <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
    </Page>
  );
};
