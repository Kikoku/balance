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
import {
  Link,
} from 'react-router';
import LeagueNode from '../LeagueNode';
import LeaguesPanel from '../LeaguesPanel';
import EventNode from '../EventNode';
import update from 'immutability-helper';

const VenueContainer = ({ data, loadMoreEvents }) => (
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
      <div className="well">
        {data.loading ? <tr><td>Loading</td></tr> : null }
        {
          data.viewer
          ?
            <Row>
              <div className="col-sm-6">
                <strong><Icon icon="map-marker" /> Location</strong><br />
                {data.viewer.organization.street}<br />
                {data.viewer.organization.city}, {data.viewer.organization.state}<br />
                {data.viewer.organization.zip}
              </div>
              <div className="col-sm-6">
                <strong>Contact</strong><br />
                <Icon icon="phone"/>: <a href={`tel:${data.viewer.organization.phone}`}>{data.viewer.organization.phone}</a><br />
                <Icon icon="envelope-o"/>: <a href={`mailto:${data.viewer.organization.email}`}>{data.viewer.organization.email}</a>
              </div>
            </Row>
          : null
        }
      </div>
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
            {
              data.viewer ? data.viewer.organization.events.pageInfo.hasNextPage ?
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      textAlign: 'center'
                    }}
                  >
                    <span
                      className="btn btn-primary"
                      onClick={loadMoreEvents}
                    >
                      Load More...
                    </span>
                  </td>
                </tr>
              : null : null
            }
          </tbody>
        </table>
      </Panel>
    </div>
  </Row>
)

const Venue = gql`
  query Venue(
    $id: ID!,
    $lCursor: String,
    $eCursor: String
  ) {
    viewer {
      organization(id: $id) {
        ...VenuesContainerVenue
        street
        city
        state
        zip
        phone
        leagues(after: $lCursor) {
          edges {
            node {
              ...LeaguesContainerNode
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
        events(first: 10, after: $eCursor) {
          edges {
            node {
              ...EventsContainerEvent
            }
          }
          pageInfo {
            endCursor
            hasNextPage
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
  }),
  props({ data, data: { fetchMore} }) {
    return {
      data,
      loadMoreEvents: () => {
        return fetchMore({
          query: Venue,
          variables: {
            eCursor: data.viewer.organization.events.pageInfo.endCursor,
            id: data.variables.id
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const { edges: newEdges, pageInfo } = fetchMoreResult.data.viewer.organization.events;
            return update(
              data,
              {
                viewer: {
                  organization: {
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
              }
            )
          }
        })
      }
    }
  }
})(VenueContainer);
