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
        color: #111;
        text-decoration: none;
      }
      .link:hover {
        background: #ccc;
      }
    `}</style>
    <div className="menu">
      <div className="item">Menu:</div>
      <a className="item link" href="/profile/">
        Profile
      </a>
      <a
        className="item link"
        href="#"
        onClick={e => {
          e.preventDefault()
          clickLogout()
        }}
      >
        Log Out
      </a>
    </div>
  </>
)
