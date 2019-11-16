import React from 'react'

const TextInput = ({
  type,
  label,
  name,
  onChange,
  required,
  width,
  height,
  padding,
  margin,
  value
}) => (
  <div className="input-root">
    <label>
      {label}
      <input
        type={type}
        name={name}
        onChange={onChange}
        required={required}
        value={value}
      />
    </label>
    <style jsx>{`
      .input-root {
        display: flex;
        flex-flow: column;
        margin: 10px auto;
      }

      label {
        display: block;
        color: #484848;
      }

      input {
        box-sizing: border-box;
        display: block;
        max-width: 300px;
        border: 1px solid #ccc;
        border-radius: 4px;
        outline-color: #f8de48;
        font-size: 1rem;
        width: ${width || '100%'};
        height: ${height ? height : '46.4px'};
        margin: ${margin};
        padding: ${padding ? padding : '5px 4px 5px 12px'};
      }
    `}</style>
  </div>
)

TextInput.defaultProps = {
  type: 'text'
}

export default TextInput
