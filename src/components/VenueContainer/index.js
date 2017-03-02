import React from 'react';
import {
  Panel,
  PanelHeading,
  PanelBody,
  Row
} from '../Grid';
import Icon from '../Icon';
import {
  graphql,
} from 'react-apollo';
import gql from 'graphql-tag';
import VenueNode from '../VenueNode';
import {
  Link,
} from 'react-router';
import LeagueNode from '../LeagueNode';
import LeaguesPanel from '../LeaguesPanel';
import EventNode from '../EventNode';

const VenueContainer = ({ data }) => (
  <Row>
    <div className="col-sm-12">
      <h2>
        <Icon icon="fort-awesome"/> <Link to="/venues">Venues</Link>
        {
          !data.loading && data.viewer ?
            ` / ${data.viewer.organization.name}`
          :
            <i className="fa fa-spinner fa-spin fa-3x fa-fw></i>" />
        }
      </h2>
    </div>
    <div className="col-sm-12">
      <LeaguesPanel
        loading={data.loading}
        error={data.error}
        leagues={data.viewer ? data.viewer.organization.leagues : null}
      />
    </div>
    <div className="col-sm-12">
      <Panel>
        <PanelHeading>
          <Icon icon="calendar"/> Events
        </PanelHeading>
        <table className="table">
          <tbody>
            <tr>
              <th>
                title
              </th>
              <th>
                Start Date
              </th>
              <th>
                Organization
              </th>
            </tr>
            {data.loading ? <tr><td>Loading</td></tr> : null }
            {data.error ? <tr><td>ERROR</td></tr> : null}
            {
              data.viewer ? data.viewer.organization.events.edges.map((event, key) => <EventNode key={key} event={event.node} />) : null
            }
          </tbody>
        </table>
      </Panel>
    </div>
  </Row>
)

const Venue = gql`
  query Venue($id: ID!) {
    viewer {
      organization(id: $id) {
        ...VenuesContainerVenue
        leagues {
          edges {
            node {
              ...LeaguesContainerNode
            }
          }
        }
        events {
          edges {
            node {
              ...EventsContainerEvent
            }
          }
        }
      }
    }
  }
  ${VenueNode.fragments.venue}
  ${LeagueNode.fragments.league}
  ${EventNode.fragments.event}
`

export default graphql(Venue, {
  options: ({ routeParams: { venueId } }) => ({
    variables: {
      id: venueId
    }
  })
})(VenueContainer);
