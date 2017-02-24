import React from 'react'

const InputGroupButton = ({ children }) => (
  <span
    className="input-group-btn"
    style={{
      minWidth: '3em'
    }}
  >
    {children}
  </span>
)

export default InputGroupButton;
