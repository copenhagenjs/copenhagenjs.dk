import React from 'react'

const Link = ({ href, children, display, onClick, size, padding, margin }) => (
  <>
    <style jsx>{`
      .link {
        display: ${display ? display : 'inline-block'};
        background: #067ade;
        color: #fff;
        border: none;
        font-size: ${size === 'default' ? '1.3rem' : '1rem'};
        margin: ${margin ? margin : '10px 0'};
        padding: ${padding ? padding : '10px'};
      }

      .link:hover {
        background-color: #0a60ab;
        cursor: pointer;
      }
    `}</style>
    <a href={href} onClick={onClick} className="link">
      {children}
    </a>
  </>
)

Link.defaultProps = {
  size: 'default'
}

export default Link
