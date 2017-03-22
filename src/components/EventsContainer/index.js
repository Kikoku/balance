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
import update from 'immutability-helper';

const EventsContainer = ({ data, loadMoreEntries }) => (
  <Row>
    <div className="col-sm-12">
      <h2>
        <Icon icon="calendar"/> Events
      </h2>
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
              data.viewer ? data.viewer.events.edges.map((event, key) => <EventNode key={key} event={event.node} />) : null
            }
            {
              data.viewer ? data.viewer.events.pageInfo.hasNextPage ? <tr>
                <td
                  colSpan={3}
                  style={{
                    textAlign: 'center'
                  }}
                  onClick={loadMoreEntries}
                >
                  <span className="btn btn-primary">
                    Load More...
                  </span>
                </td>
              </tr>: null : null
            }
          </tbody>
        </table>
      </Panel>
    </div>
  </Row>
)

const Events = gql`
  query Events($cursor: String) {
    viewer {
      events(first:10, after: $cursor) {
        edges {
          node {
            ...EventsContainerEvent
          }
        }
        pageInfo{
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${EventNode.fragments.event}
`

export default graphql(Events, {
  props({ data, data: { loading, viewer, fetchMore } }) {
    return {
      data,
      loadMoreEntries: () => {
        return fetchMore({
          query: Events,
          variables: {
            cursor: viewer.events.pageInfo.endCursor
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const { edges: newEdges, pageInfo } = fetchMoreResult.data.viewer.events;
            return update(
              data,
              {
                viewer: {
                  events: {
                    edges: {
                      $push: newEdges
                    },
                    pageInfo: {
                      $set: pageInfo
                    }
                  }
                }
              }
            )
          }
        })
      }
    }
  }
})(EventsContainer);
