import React from 'react';
import {
  Panel,
  PanelHeading,
  PanelBody,
  Row,
  InputGroup,
  InputGroupAddon,
} from '../Grid';
import Icon from '../Icon';
import {
  graphql,
} from 'react-apollo';
import gql from 'graphql-tag';
import {
  Link,
} from 'react-router';
import ResultPanel from '../ResultPanel';
import update from 'immutability-helper';

class EventContainer extends React.Component {
  render() {
    const { loading, viewer } = this.props.data;
    const { loadMoreResults } = this.props;
    return (
      <Row>
        <div className="col-sm-12">
          <h2>
            <Icon icon="calendar"/> <Link to="/events">Events</Link>
            {
              !loading ?
                ` / ${viewer.event.title}`
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
              <Row>
                <div className="col-lg-3 col-md-6">
                  <InputGroup>
                    <InputGroupAddon>
                      Start Date:
                    </InputGroupAddon>
                    <input
                      className="form-control"
                      type="text"
                      value={!loading ? viewer.event.startdate : 'Loading'}
                      disabled={true}
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-4 col-md-6">
                  <InputGroup>
                    <InputGroupAddon>
                      Sanction Number:
                    </InputGroupAddon>
                    <input
                      className="form-control"
                      type="text"
                      value={!loading ? viewer.event.sanctionnumber : 'Loading'}
                      disabled={true}
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-5 col-md-12">
                  <InputGroup>
                    <InputGroupAddon>
                      Event GUID:
                    </InputGroupAddon>
                    <input
                      className="form-control"
                      type="text"
                      value={!loading ? viewer.event.eventguid : 'Loading'}
                      disabled={true}
                    />
                  </InputGroup>
                </div>
              </Row>
            </PanelBody>
          </Panel>
        </div>
        <div className="col-sm-12">
          {
            !loading
            ?
              <ResultPanel
                users={viewer.event.results.edges}
                loadMoreUsers={loadMoreResults}
                hasNextPage={viewer.event.results.pageInfo.hasNextPage}
              />
            :
            <i className="fa fa-spinner fa-spin fa-3x fa-fw></i>" />
          }
        </div>
      </Row>
    )
  }
}

const Event = gql`
  query Event(
    $id: ID!,
    $cursor: String
  ) {
    viewer {
      event(id: $id) {
        id
        eventguid,
        title,
        startdate,
        sanctionnumber,
        organization {
          id
          name
        }
        results(first: 10, after: $cursor) {
          edges {
            node {
              id
              person {
                first
                last
                middle
              }
              win
              loss
              draw
              elo
              change
            }
          }
          pageInfo {
            endCursor,
            hasNextPage
          }
        }
      }
    }
  }
`

export default graphql(Event, {
  options: ({ routeParams: { eventId } }) => ({
    variables: {
      id: eventId
    }
  }),
  props({ data, data: { fetchMore } }) {
    return {
      data,
      loadMoreResults: () => {
        return fetchMore({
          query: Event,
          variables: {
            cursor: data.viewer.event.results.pageInfo.endCursor,
            id: data.variables.id
          },
          updateQuery: ( previousResult, { fetchMoreResult }) => {
            const { edges: newEdges, pageInfo } = fetchMoreResult.data.viewer.event.results;
            return update(
              data,
              {
                viewer: {
                  event: {
                    results: {
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
})(EventContainer);
