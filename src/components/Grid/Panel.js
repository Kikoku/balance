import React from 'react';

const Panel = ({ children, type = 'default' }) => (
  <div className={`panel panel-${type}`}>
    {children}
  </div>
)

export default Panel;
