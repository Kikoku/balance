import React, { Component } from 'react';
import {
  graphql,
} from 'react-apollo';
import gql from 'graphql-tag';
import LeagueOption from './LeagueOption';

class LeagueSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
  }

  _handleInitialSelect(e) {
    this.props._handleChange(e);
    this.setState({
      selected: true
    })
  }

  render() {
    const { data, _handleChange } = this.props;
    const { selected } = this.state;
    return (
      data.node
      ?
        <select
          className="form-control"
          onChange={(e) => this._handleInitialSelect(e)}
          name="leagueId"
          style={{
            color: selected ? '#555' : '#999'
          }}
        >
          <option
            value=""
            disabled
            selected
            hidden
          >
            Select a League...
          </option>
          {
            data.node.leagues.edges.map((league) => (
              <LeagueOption {...league.node} key={league.node.id}/>
            ))
          }
        </select>
      :
        <i className="fa fa-spinner fa-spin fa-3x fa-fw></i>" />
    )
  }
}

const CurrentOrgLeaguesForLayout = gql`
  query CurrentOrgLeaguesForLayout(
    $orgId: ID!
  ) {
    node(id:$orgId) {
      ... on Organization {
        leagues {
          edges {
            node {
              id
              title
              startdate
              enddate
            }
          }
        }
      }
    }
  }
`

export default graphql(CurrentOrgLeaguesForLayout, {
  options(props) {
    return {
      variables: {
        orgId: props.org.id
      },
      forceFetch: true
    }
  }
})(LeagueSelect);
