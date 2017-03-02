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

class LeagueContainer extends React.Component {
  render() {
    const { loading, viewer } = this.props.data;
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
            </ListGroup>
          </Panel>
        </div>
      </Row>
    )
  }
}

const League = gql`
  query League($id: ID!) {
    viewer {
      league(id: $id) {
        ...LeaguesContainerNode
        events {
          edges {
            node {
              ...LeagueEventNode
            }
          }
        }
        users {
          edges {
            node {
              ...ResultNode
            }
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
      id: leagueId
    }
  })
})(LeagueContainer);
