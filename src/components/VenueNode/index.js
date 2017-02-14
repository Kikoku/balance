import React from 'react';
import gql from 'graphql-tag'
import {
  Link
} from 'react-router';

const VenueNode = ({ organization }) => {

  return (
    <tr>
      <td>
        <Link to={`/venues/${organization.id}`}>
          {organization.name}
        </Link>
      </td>
      <td>
        {organization.email}
      </td>
    </tr>
  )
}

VenueNode.fragments = {
  venue: gql`
    fragment VenuesContainerVenue on Organization {
      id,
      name,
      email
    }
  `
};

export default VenueNode;
