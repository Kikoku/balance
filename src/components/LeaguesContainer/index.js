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
import LeagueNode from '../LeagueNode';

const LeaguesContainer = ({ data }) => (
  <Row>
    <div className="col-sm-12">
      <h2>
        <Icon icon="tasks"/> Leagues
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
                Title
              </th>
              <th>
                Start Date
              </th>
              <th>
                End Date
              </th>
            </tr>
            {data.loading ? <tr><td>Loading</td></tr> : null }
            {data.error ? <tr><td>ERROR</td></tr> : null}
            {
              data.viewer ? data.viewer.leagues.edges.map((league, key) => <LeagueNode key={key} league={league.node} />) : null
            }
          </tbody>
        </table>
      </Panel>
    </div>
  </Row>
)

const Leagues = gql`query Leagues {
  viewer {
    leagues {
      edges {
        node {
          ...LeaguesContainerLeague
        }
      }
    }
  }
}
${LeagueNode.fragments.league}`

export default graphql(Leagues)(LeaguesContainer);
