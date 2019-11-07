import React from 'react'

export default () => (
  <>
    <style jsx>{`
      .menu {
        display: flex;
        align-items: middle;
      }
      .item {
        padding: 5px 12px;
        margin: 0 5px;
      }
      .link {
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
        <a href="#">Log Out</a>
      </div>
    </div>
  </>
)
