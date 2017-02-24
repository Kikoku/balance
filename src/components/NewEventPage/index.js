import React, { Component } from 'react';
import {
  graphql,
} from 'react-apollo';
import gql from 'graphql-tag';
import {
  Panel,
  PanelHeading,
  PanelBody,
  Row,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from '../Grid';
import Icon from '../Icon';
import {
  Link,
} from 'react-router';
import DashboardNav from '../DashboardPage/DashboardNav';

class NewLeaguePage extends Component {
  render() {
    return (
      <Row>
        <div className="col-sm-12">
          <h2>
            <Icon icon="dashboard"/> <Link to="/dashboard">Dashboard</Link> / New Event
          </h2>
        </div>
        <div className="col-sm-4">
          <DashboardNav location={this.props.location} viewer={viewer} />
        </div>
        <div className="col-sm-8">
          <Panel>
            <PanelHeading>

            </PanelHeading>
            <PanelBody>
            </PanelBody>
          </Panel>
        </div>
      </Row>
    )
  }
}

export default NewLeaguePage;
