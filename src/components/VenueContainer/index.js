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

const VenueContainer = ({ data }) => (
  <Row>
    <div className="col-sm-12">
      <h2>
        <Icon icon="fort-awesome"/> <Link to="/venues">Venues</Link>
        {
          !data.loading ?
            ` / ${data.viewer.organization.name}`
          :
            <i className="fa fa-spinner fa-spin fa-3x fa-fw></i>" />
        }
      </h2>
    </div>
    <div className="col-sm-12">
      <Panel>
        <PanelHeading>
        </PanelHeading>
        <PanelBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </PanelBody>
      </Panel>
    </div>
    <div className="col-sm-12">
      <LeaguesPanel
        loading={data.loading}
        error={data.error}
        leagues={data.viewer ? data.viewer.organization.leagues : null}
      />
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
      }
    }
  }
  ${VenueNode.fragments.venue}
  ${LeagueNode.fragments.league}
`

export default graphql(Venue, {
  options: ({ routeParams: { venueId } }) => ({
    variables: {
      id: venueId
    }
  })
})(VenueContainer);
