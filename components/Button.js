import React from 'react';

const Button = ({ type, children, display, onClick, size, width, height, padding, margin }) => (
  <button type={type} onClick={onClick} className="button-root">
    {children}
    <style jsx>{`
      .button-root {
        display: ${display ? display : 'inline-block'};
        max-width: 300px;
        background: #428bca;
        color: #fff;
        border: none;
        font-size: ${size === 'sm' ? '1rem' : '1.3rem'};
        width: ${width ? width : '100%'};
        height: ${height};
        margin: ${margin ? margin : '10px auto'};
        padding: ${padding ? padding : '10px'};
      }

      .button-root:hover {
        background-color: #067ade;
        cursor: pointer;
      }
    `}</style>
  </button>
);

Button.defaultProps = {
  type: 'button',
  size: 'sm',
};

export default Button;
