import React from 'react'

export default ({ clickLogout }) => (
  <>
    <style jsx>{`
      .menu {
        display: flex;
        align-items: middle;
        margin-bottom: 20px;
      }
      .item {
        padding: 5px 12px;
      }
      .link {
        margin-left: 10px;
        border: 1px solid #ccc;
      }
      .link:hover {
        background: #ccc;
      }
      .link a {
        color: #111;
        text-decoration: none;
      }
    `}</style>
    <div className="menu">
      <div className="item">Menu:</div>
      <div className="item link">
        <a href="/profile/">Profile</a>
      </div>
      <div className="item link">
        <a
          href="#"
          onClick={e => {
            e.preventDefault()
            clickLogout()
          }}
        >
          Log Out
        </a>
      </div>
    </div>
  </>
)
