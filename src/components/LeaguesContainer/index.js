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
import LeaguesPanel from '../LeaguesPanel';
import LeagueNode from '../LeagueNode';

const LeaguesContainer = ({ data }) => (
  <Row>
    <div className="col-sm-12">
      <h2>
        <Icon icon="tasks"/> Leagues
      </h2>
    </div>
    <div className="col-sm-12">
      <LeaguesPanel
        loading={data.loading}
        error={data.error}
        leagues={data.viewer ? data.viewer.leagues : null}
      />
    </div>
  </Row>
)

const Leagues = gql`
  query Leagues {
    viewer {
      leagues {
        edges {
          node {
            ...LeaguesContainerNode
          }
        }
      }
    }
  }
  ${LeagueNode.fragments.league}
`

export default graphql(Leagues)(LeaguesContainer);
