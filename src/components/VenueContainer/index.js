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

class VenueContainer extends React.Component {
  render() {
    console.log(this.props.data.viewer);
    return (
      <Row>
        <div className="col-xs-12">
          <h2>
            <Icon icon="fort-awesome"/> <Link to="/venues">Venues</Link>
            {
              !this.props.data.loading ?
                ` / ${this.props.data.viewer.organization.name}`
              :
                <i className="fa fa-spinner fa-spin fa-3x fa-fw></i>" />
            }
          </h2>
        </div>
        <div className="col-xs-12">
          <Panel>
            <PanelHeading>
            </PanelHeading>
            <PanelBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </PanelBody>
          </Panel>
        </div>
      </Row>
    )
  }
}

const Venue = gql`query Venue($id: ID!) {
  viewer {
    organization(id: $id) {
      ...VenuesContainerVenue
    }
  }
}
${VenueNode.fragments.venue}`

export default graphql(Venue, {
  options: ({ routeParams: { venueId } }) => ({
    variables: {
      id: venueId
    }
  })
})(VenueContainer);
