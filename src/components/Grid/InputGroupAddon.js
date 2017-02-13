import React from 'react'

const InputGroupAddon = ({ children }) => (
  <span
    className="input-group-addon"
    style={{
      minWidth: '3em'
    }}
  >
    {children}
  </span>
)

export default InputGroupAddon;
