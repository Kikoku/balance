import React from 'react';
import {
  Panel,
  PanelHeading,
} from '../Grid';
import LeagueNode from '../LeagueNode';

const LeaguesPanel = ({loading, error, leagues}) => (
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
        {loading ? <tr><td>Loading</td></tr> : null }
        {error ? <tr><td>ERROR</td></tr> : null}
        {
          leagues ? leagues.edges.map((league, key) => <LeagueNode key={key} league={league.node} />) : null
        }
      </tbody>
    </table>
  </Panel>
)

export default LeaguesPanel;
