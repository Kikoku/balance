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
import LeagueNode from '../LeagueNode';
import {
  Link,
} from 'react-router';

class LeagueContainer extends React.Component {
  render() {
    return (
      <Row>
        <div className="col-sm-12">
          <h2>
            <Icon icon="tasks"/> <Link to="/leagues">Leagues</Link>
            {
              !this.props.data.loading ?
                ` / ${this.props.data.viewer.league.title}`
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
      </Row>
    )
  }
}

const League = gql`
  query League($id: ID!) {
    viewer {
      league(id: $id) {
        ...LeaguesContainerLeague
      }
    }
  }
  ${LeagueNode.fragments.league}
`

export default graphql(League, {
  options: ({ routeParams: { leagueId } }) => ({
    variables: {
      id: leagueId
    }
  })
})(LeagueContainer);
