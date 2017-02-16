import React from 'react';
import {
  Panel,
  PanelHeading,
  Row
} from '../Grid';
import Icon from '../Icon';
import {
  graphql,
} from 'react-apollo';
import gql from 'graphql-tag';
import VenueNode from '../VenueNode';

const VenuesContainer = ({ data }) => (
  <Row>
    <div className="col-sm-12">
      <h2>
        <Icon icon="fort-awesome"/> Venues
      </h2>
    </div>
    <div className="col-sm-12">
      <Panel>
        <PanelHeading>

        </PanelHeading>
        <table className="table">
          <tbody>
            <tr>
              <th>
                Name
              </th>
              <th>
                Email
              </th>
            </tr>
            {data.loading ? <tr><td>Loading</td></tr> : null }
            {data.error ? <tr><td>ERROR</td></tr> : null}
            {
              data.viewer ? data.viewer.organizations.edges.map((organization, key) => <VenueNode key={key} organization={organization.node} />) : null
            }
          </tbody>
        </table>
      </Panel>
    </div>
  </Row>

)

const Venues = gql`query Venues {
  viewer {
    organizations {
      edges {
        node {
          ...VenuesContainerVenue
        }
      }
    }
  }
}
${VenueNode.fragments.venue}`

export default graphql(Venues)(VenuesContainer);
