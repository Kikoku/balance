import React from 'react';
import {
  Panel,
  PanelHeading,
  PanelBody,
  Row,
} from '../Grid';
import Icon from '../Icon';
import DashboardNav from '../DashboardPage/DashboardNav';

const DashboardProfile = ({ location, data }) => (
    <Row>
      <div className="col-sm-12">
        <h2>
          <Icon icon="dashboard"/> Dashboard
        </h2>
      </div>
      <div className="col-sm-4">
        <DashboardNav location={location} viewer={data ? data.viewer : null} />
      </div>
      <div className="col-sm-8">
        <Panel>
          <PanelHeading>

          </PanelHeading>
          <PanelBody>
            Dashboard Home
          </PanelBody>
        </Panel>
      </div>
    </Row>
)


export default DashboardProfile;
