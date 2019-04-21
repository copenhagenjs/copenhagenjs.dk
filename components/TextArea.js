import React from 'react';

const TextInput = ({
  label,
  name,
  onChange,
  required,
  minLength,
  maxLength,
  width,
  height,
  padding,
  margin,
}) => (
  <div className="input-root">
    <label htmlFor={name}>{label}</label>
    <textarea
      name={name}
      onChange={onChange}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
    />
    <style jsx>{`
      .input-root {
        display: flex;
        flex-flow: column;
        max-width: 300px;
        margin: 10px auto;
      }

      label {
        font-size: 12px;
        text-transform: uppercase;
        display: block;
        font-family: 'Source Sans Pro', sans-serif;
        color: #484848;
        font-weight: 800;
        etter-spacing: 0.08333333333333333em;
      }

      textarea {
        box-sizing: border-box;
        display: block;
        max-width: 300px;
        border: 1px solid #ebebeb;
        border-radius: 4px;
        outline-color: #f8de48;
        font-size: 1rem;
        width: ${width};
        height: ${height ? height : '80px'};
        margin: ${margin ? margin : '10px 0'};
        padding: ${padding ? padding : '5px 4px 5px 12px'};
      }
    `}</style>
  </div>
);

TextInput.defaultProps = {
  type: 'text',
};

export default TextInput;
