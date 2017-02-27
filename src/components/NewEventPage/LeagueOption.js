import React from 'react';

const LeagueOption = ({ id,  title, startdate, enddate }) => (
  <option
    value={id}
    style={{
      color: '#555'
    }}
  >
    {title}, {startdate} - {enddate}
  </option>
)

export default LeagueOption;
