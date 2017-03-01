import React from 'react';
import gql from 'graphql-tag'
import {
  Link
} from 'react-router';

const LeagueNode = ({ league }) => {

  return (
    <tr>
      <td>
        <Link to={`/leagues/${league.id}`}>
          {league.title}
        </Link>
      </td>
      <td>
        {league.startdate}
      </td>
      <td>
        {league.enddate}
      </td>
    </tr>
  )
}

LeagueNode.fragments = {
  league: gql`
    fragment LeaguesContainerNode on League {
      id,
      title,
      startdate,
      enddate
    }
  `
};

export default LeagueNode;
