export default () => (
  <section className="newsletter">
    <h3>Dont miss important news!</h3>

    <div className="social">
      <div>
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fcopenhagenjs%2F&tabs&width=300&height=214&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=167461780321599"
          width="300"
          height="214"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          frameBorder="0"
          allowtransparency="true"
        />
      </div>
      <div>
        <a
          href="https://twitter.com/copenhagenjs"
          className="twitter-follow-button"
          data-show-count="true"
          data-size="large"
        >
          Follow @copenhagenjs
        </a>
      </div>
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
)
