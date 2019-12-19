import React from 'react'

export default () => (
  <section className="footer">
    <style jsx>{`
      .footer {
        display: flex;
        background-color: #f8de48;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
      }
      .footer > div {
        margin: 20px;
      }
      @media (min-width: 1024px) {
        .footer {
          flex-direction: row;
        }
        .footer > div {
          margin: 40px 20px;
        }
      }
      .discord-logo {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .github-logo {
        width: 25px;
        height: 25px;
        vertical-align: middle;
        margin-right: 6px;
      }
      .newsletter {
        text-align: center;
      }
      @media (min-width: 1024px) {
        .newsletter {
          text-align: left;
        }
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
    <div className="newsletter">
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
    </div>
    <div className="social">
      <h3>Dont miss important news!</h3>
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
      <div>
        <a
          href="https://github.com/copenhagenjs/copenhagenjs.dk"
          target="_blank"
        >
          <svg
            className="github-logo"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          Contribute on GitHub
        </a>
      </div>
      <div className="discord">
        <a href="https://discord.gg/7vxce3s">
          <img
            className="discord-logo"
            src="/static/images/discord-logo.svg"
            alt="copenhagenjs discord"
          />
          Join our Discord
        </a>
      </div>
    </div>

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
    <script async src="//platform.twitter.com/widgets.js" />
  </section>
)
