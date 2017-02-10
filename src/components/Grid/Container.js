import React from 'react';

const Container = ({children, fluid = false}) => (
  <div className={`container${ fluid ? '-fluid' : ''}`}>
    {children}
  </div>
)

export default Container;
