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
import LeagueResultNode from '../LeagueResultNode';
import {
  Link,
} from 'react-router';

class LeagueContainer extends React.Component {
  render() {
    console.log(this.props);
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
          <Panel>
            <PanelHeading>
            </PanelHeading>
            <PanelBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </PanelBody>
          </Panel>
        </div>
        <div className="col-sm-12">
          <Panel>
            <PanelHeading>
              <Icon icon="sort-numeric-asc"/> Results
            </PanelHeading>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <div className="col-sm-4 col-xs-6">
                    Player
                  </div>
                  <div className="col-sm-4 hidden-xs">
                    Win | Loss | Draw
                  </div>
                  <div className="col-sm-4 col-xs-6">
                    Elo
                  </div>
                </Row>
              </ListGroupItem>
              {
                !loading
                ?
                  viewer.league.users.edges.map(user => <LeagueResultNode {...user.node}/> )
                :
                  <ListGroupItem>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw></i>" />
                  </ListGroupItem>
              }
            </ListGroup>
          </Panel>
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
        ...LeaguesContainerLeague
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
              ...LeagueResultNode
            }
          }
        }
      }
    }
  }
  ${LeagueNode.fragments.league}
  ${LeagueEventNode.fragments.events}
  ${LeagueResultNode.fragments.results}
`

export default graphql(League, {
  options: ({ routeParams: { leagueId } }) => ({
    variables: {
      id: leagueId
    }
  })
})(LeagueContainer);
