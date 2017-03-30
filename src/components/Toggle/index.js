import React from 'react';
import Icon from '../Icon';

const Toggle = ({toggled, children, handleToggle}) => (
  <span
    onClick={handleToggle}
    style={{
      cursor: 'pointer',
      userSelect: 'none',
      MozUserSelect: 'none'
    }}
  >
    <span
      style={{
        color: toggled ? '#27ae60' : 'inherit'
      }}
    >
      <Icon
        icon={`toggle-${toggled ? 'on' : 'off'}`}
      />
    </span>
    &nbsp;{children}
  </span>
)

export default Toggle;
