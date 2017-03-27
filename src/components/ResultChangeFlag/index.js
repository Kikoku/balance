import React from 'react';
import Icon from '../Icon';

const ResultChangeFlag = ({change}) => {
    return (
      <span>
        {
          change !== 0
          ?
            <span style={{color: change > 0 ? '#27ae60' : '#c0392b'}}>
              <Icon icon={change > 0 ? 'chevron-up' : 'chevron-down'}/> {change}
            </span>
          :
            <Icon icon="minus" />
        }
      </span>
    )
}

export default ResultChangeFlag;
