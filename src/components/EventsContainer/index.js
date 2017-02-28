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
import EventNode from '../EventNode';

const EventsContainer = ({ data }) => {
  return (
  <Row>
    <div className="col-sm-12">
      <h2>
        <Icon icon="calendar"/> Events
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
              data.viewer ? data.viewer.events.edges.map((event, key) => <EventNode key={key} event={event.node} />) : null
            }
          </tbody>
        </table>
      </Panel>
    </div>
  </Row>
)}

const Events = gql`query Events {
  viewer {
    events {
      edges {
        node {
          ...EventsContainerEvent
        }
      }
    }
  }
}
${EventNode.fragments.event}`

export default graphql(Events)(EventsContainer);
