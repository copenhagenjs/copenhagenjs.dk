import React from 'react'

export default class Navigation extends React.Component {
  constructor() {
    super()
    this.state = {
      showmenu: false,
      loggedIn: false
    }
  }
  componentDidMount() {
    this.setState({
      loggedIn: window.localStorage.getItem('copenhagenjs_loggedin') === 'true'
    })
  }
  render() {
    return (
      <div>
        <style jsx>{`
          .btn-white {
            text-decoration: none;
            border: 1px solid #fff;
            border-radius: 0;
            padding: 10px 20px;
            font-weight: bold;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.5);
            text-transform: uppercase;
            transition: all 0.2s;
          }
          .btn-white:hover {
            background: #f9e036;
            color: #444;
          }
          .show-menu {
            display: block;
            margin: 10px 10px;
          }
          .navigation {
            display: none;
            margin: 0;
            padding: 0;
            list-style-type: none;
          }
          @media (max-width: 800px) {
            .navigation li a {
              display: block;
              line-height: 28px;
              padding: 5px 10px;
              margin: 10px 10px;
            }
          }
          @media (min-width: 800px) {
            .show-menu {
              display: none;
            }
            .navigation {
              display: flex;
              justify-content: center;
            }
            .navigation li {
              display: inline-block;
              line-height: 28px;
            }
          }
        `}</style>
        <a
          className="btn-white show-menu"
          onClick={e => {
            e.preventDefault()
            this.setState({
              showmenu: !this.state.showmenu
            })
          }}
          href="#"
        >
          {this.state.showmenu ? 'Hide' : 'Show'} Menu
        </a>
        <ul
          className="navigation"
          style={{
            display: this.state.showmenu ? 'block' : ''
          }}
        >
          <li>
            <a className="btn-white" href="/">
              Home
            </a>
          </li>
          <li>
            <a className="btn-white" href="/events/">
              Events
            </a>
          </li>
          <li>
            <a className="btn-white" href="/about/">
              About
            </a>
          </li>
          <li>
            <a className="btn-white" href="/videos/">
              Videos
            </a>
          </li>
          <li>
            <a className="btn-white" href="/contact/">
              Contact
            </a>
          </li>
          <li>
            <a className="btn-white" href="/speakers/">
              Speakers
            </a>
          </li>
          {this.state.loggedIn ? (
            <li>
              <a className="btn-white" href="/profile/">
                Profile
              </a>
            </li>
          ) : (
            <li>
              <a className="btn-white" href="/login/">
                Login
              </a>
            </li>
          )}
        </ul>
      </div>
    )
  }
}
