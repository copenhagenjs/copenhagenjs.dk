import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import marked from 'marked';

export default () => (
  <Layout>
    <header className="page-header master bg-grey" role="navigation">
      <Navigation />

      <img
        className="logo"
        src="/static/images/cphjs.png"
        alt="CopenhagenJS logo"
      />
      <h3>
        CopenhagenJS is a monthly meetup for people interested in JavaScript in
        Copenhagen.
      </h3>

      <a
        className="credits"
        href="http://www.flickr.com/photos/tenzer/8148224729/"
      >
        Photo by Jeppe Toustrup
      </a>
    </header>

    <section className="page">
      <div
        dangerouslySetInnerHTML={{
          __html: marked(`
# November Meetup 29th

It is time for the November edition of CopenhagenJS. We are going to be hosted by SaxoBank, which is a really cool venue. Let's meet and talk some Javascript.

### Schedule:

    17:00 - Doors open
    17:45 - Welcome
    18:00 - Using the new React Hooks - Younes Meliani
    18:25 - Break with food and drinks
    19:00 - Morphism and reusability - How we built a new product in record time - Atli Adalsteinsson
    19:35 - How we use Storybooks at Vivino - Johnathan Sewell
    20:00 - Quiz time
    20:10 - Socialising - meet the community
    21:00 - See you next time!

### What is CopenhagenJS?

it's a monthly community group in Copenhagen for all JavaScript developers. We get together and share the things we work on and really like. We talk about new frameworks and techniques that we can use in work to make it better.

### Can I present something at CopenhagenJS?

Yes, CopenhagenJS is for and by the community so you are more than welcome to talk about things that you find interesting.

Remember to Like our facebook to get all the latest updates and videos!

https://www.facebook.com/copenhagenjs/

You can write to us here on the meetup.com page if you want to help, or if you just want to ask about something.

Looking forward to seeing you!

Kevin & Paul`)
        }}
      />
      <div className="next-meetup">
        <p>Read more and sign up for the next event here:</p>

        <a
          className="next-meetup__button"
          href="https://www.meetup.com/copenhagenjs/"
        >
          View meetup group
        </a>
      </div>
    </section>

    <section className="newsletter">
      <h3>Dont miss important news!</h3>

      <div className="social">
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fcopenhagenjs%2F&tabs&width=300&height=214&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=167461780321599"
          width="300"
          height="214"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          frameBorder="0"
          allowtransparency="true"
        />
        <a
          href="https://twitter.com/copenhagenjs"
          className="twitter-follow-button"
          data-show-count="true"
          data-size="large"
        >
          Follow @copenhagenjs
        </a>
      </div>

      <div className="newsletter__description">
        <p>
          Sign up for the CopenhagenJS newsletter and get notifications about
          upcoming events.
        </p>
      </div>
      <form
        action="//copenhagenjs.us11.list-manage.com/subscribe/post?u=e5f1b30e5ca3a2a397fa93a0d&amp;id=163c4118a6"
        method="post"
        target="_blank"
      >
        <input
          type="email"
          placeholder="mail@example.com"
          name="EMAIL"
          className="newsletter__email"
          required
        />
        <div style={{ position: 'absolute', left: '-5000px' }}>
          <input
            type="text"
            name="b_e5f1b30e5ca3a2a397fa93a0d_163c4118a6"
            tabIndex="-1"
          />
        </div>
        <input
          type="submit"
          value="Subscribe now!"
          name="subscribe"
          className="newsletter__subscribe"
        />
      </form>
    </section>
  </Layout>
);
