import React from 'react'

export default () => (
  <section className="newsletter">
    <style jsx>{`
      .newsletter {
        background-color: #f8de48;
        text-align: center;
        padding: 50px;
      }
      .newsletter h3 {
        margin-top: 10px;
      }
      .newsletter__email {
        padding: 10px;
        font-size: 1rem;
        width: 100%;
        box-sizing: border-box;
        max-width: 300px;
      }
      .newsletter__subscribe {
        padding: 10px;
        font-size: 1rem;
        border: none;
        background-color: #fff;
        background: #428bca;
        color: #fff;
        display: block;
        width: 100%;
        max-width: 300px;
        margin: 10px auto;
      }
      @media (min-width: 500px) {
        .newsletter__subscribe {
          display: inline-block;
          width: auto;
        }
      }
      .newsletter__subscribe:hover {
        background-color: #067ade;
        cursor: pointer;
      }
      .newsletter__description {
        max-width: 420px;
        margin: 0 auto;
      }
    `}</style>
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

      <a
        href="https://www.youtube.com/channel/UCOD8lwED5PAcgmhwymQJsng"
        target="_blank"
        aria-label="Watch our videos"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          viewBox="0 0 256 180"
          style={{ verticalAlign: 'bottom' }}
        >
          <defs>
            <clipPath id="a">
              <path d="M0 192h192V0H0z" />
            </clipPath>
          </defs>
          <g clipPath="url(#a)" transform="matrix(1,0,0,1,34,0)">
            <path
              d="M180.322 138.637c-2.024 7.622-7.987 13.624-15.56 15.661C151.036 158 96 158 96 158s-55.037 0-68.762-3.702c-7.573-2.037-13.537-8.039-15.56-15.66C8 124.822 8 96 8 96s0-28.822 3.677-42.638c2.024-7.62 7.988-13.623 15.561-15.66C40.963 34 96 34 96 34s55.037 0 68.761 3.701c7.574 2.038 13.537 8.04 15.561 15.661C184 67.178 184 96 184 96s0 28.823-3.678 42.637"
              fill="red"
            />
            <path d="M78 69.831L124 96l-46 26.17z" fill="#fff" />
          </g>
        </svg>
        Subscribe on Youtube
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
    <script async src="//platform.twitter.com/widgets.js" />
  </section>
)
