import React from 'react';
import gql from 'graphql-tag';
import {
  ListGroupItem,
  Row,
} from '../Grid';
import {
  Link,
} from 'react-router'

const LeagueEventNode = ({ id, title, startdate, organization }) => (
  <ListGroupItem>
    <Row>
      <div className="col-sm-4 col-xs-6">
        <Link to={`/events/${id}`}>{title}</Link>
      </div>
      <div className="col-sm-4 hidden-xs">
        {startdate}
      </div>
      <div className="col-sm-4 col-xs-6">
        <Link to={`/venues/${organization.id}`}>{organization.name}</Link>
      </div>
    </Row>
  </ListGroupItem>
)

LeagueEventNode.fragments = {
  events: gql`
    fragment LeagueEventNode on Event {
      id,
      title,
      startdate,
      organization {
        id
        name
      }
    }
  `
}

export default LeagueEventNode;
