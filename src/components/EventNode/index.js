import React from 'react';
import gql from 'graphql-tag'
import {
  Link
} from 'react-router';

const EventNode = ({ event }) => {

  return (
    <tr>
      <td>
        {event.startdate}
      </td>
      <td>
        <Link to={`/events/${event.id}`}>
          {event.title}
        </Link>
      </td>
      <td>
        <Link to={`/venues/${event.organization.id}`}>
          {event.organization.name}
        </Link>
      </td>
    </tr>
  )
}

EventNode.fragments = {
  event: gql`
    fragment EventsContainerEvent on Event {
      id
      eventguid,
      title,
      startdate,
      sanctionnumber,
      organization {
        id
        name
      }
    }
  `
};

export default EventNode;
