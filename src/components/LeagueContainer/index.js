import React from 'react';
import {
  Panel,
  PanelHeading,
  PanelBody,
  Row,
  ListGroup,
  ListGroupItem,
} from '../Grid';
import Icon from '../Icon';
import {
  graphql,
} from 'react-apollo';
import gql from 'graphql-tag';
import LeagueNode from '../LeagueNode';
import LeagueEventNode from '../LeagueEventNode';
import ResultNode from '../ResultNode';
import {
  Link,
} from 'react-router';
import ResultPanel from '../ResultPanel';
import update from 'immutability-helper';

class LeagueContainer extends React.Component {
  render() {
    const { data: { loading, viewer }, loadMoreEvents, loadMoreUsers } = this.props;
    return (
      <Row>
        <div className="col-sm-12">
          <h2>
            <Icon icon="tasks"/> <Link to="/leagues">Leagues</Link>
            {
              !loading ?
                ` / ${viewer.league.title}`
              :
                <i className="fa fa-spinner fa-spin fa-3x fa-fw></i>" />
            }
          </h2>
        </div>
        <div className="col-sm-12">
          {
            !loading
            ?
              <ResultPanel users={viewer.league.users.edges} />
            :
            <i className="fa fa-spinner fa-spin fa-3x fa-fw></i>" />
          }
        </div>
        <div className="col-sm-12">
          <Panel>
            <PanelHeading>
              <Icon icon="calendar"/> Events
            </PanelHeading>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <div className="col-sm-4 col-xs-6">
                    Event
                  </div>
                  <div className="col-sm-4 hidden-xs">
                    Date
                  </div>
                  <div className="col-sm-4 col-xs-6">
                    Venue
                  </div>
                </Row>
              </ListGroupItem>
              {
                !loading
                ?
                  viewer.league.events.edges.map(event => <LeagueEventNode {...event.node} key={event.node.id}/> )
                :
                  <ListGroupItem>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw></i>" />
                  </ListGroupItem>
              }
              {
                !loading ? viewer.league.events.pageInfo.hasNextPage ?
                  <ListGroupItem>
                    <Row>
                      <div
                        className="col-md-12"
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
                      </div>
                    </Row>
                  </ListGroupItem>
                : null : null
              }
            </ListGroup>
          </Panel>
        </div>
      </Row>
    )
  }
}

const League = gql`
  query League(
    $id: ID!,
    $eCursor: String,
    $uCursor: String
  ) {
    viewer {
      league(id: $id) {
        ...LeaguesContainerNode
        events(first: 10, after: $eCursor) {
          edges {
            node {
              ...LeagueEventNode
            }
          }
          pageInfo{
            endCursor
            hasNextPage
          }
        }
        users(after: $uCursor) {
          edges {
            node {
              ...ResultNode
            }
          }
          pageInfo{
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
  ${LeagueNode.fragments.league}
  ${LeagueEventNode.fragments.events}
  ${ResultNode.fragments.results}
`

export default graphql(League, {
  options: ({ routeParams: { leagueId } }) => ({
    variables: {
      id: leagueId,
    },
    forceFetch: true
  }),
  props({ data, data: { fetchMore } }) {
    return {
      data,
      loadMoreEvents: () => {
        return fetchMore({
          query: League,
          variables: {
            eCursor: data.viewer.league.events.pageInfo.endCursor,
            id: data.variables.id
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const { edges: newEdges, pageInfo } = fetchMoreResult.data.viewer.league.events;
            return update(
              data,
              {
                viewer: {
                  league: {
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
      },
      loadMoreUsers: () => {
        return fetchMore({
          query: League,
          variables: {
            uCursor: data.viewer.league.users.pageInfo.endCursor,
            id: data.variables.id
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const { edges: newEdges, pageInfo } = fetchMoreResult.data.viewer.league.users;
            return update(
              data,
              {
                viewer: {
                  league: {
                    users: {
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
})(LeagueContainer);
