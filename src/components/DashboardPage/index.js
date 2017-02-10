import React from 'react';
import {
  Container,
  Row
} from '../Grid';
import Icon from '../Icon';

const DashboardPage = () => (
  <Container>
    <Row>
      <div className="col-xs-12">
        <h2>
          <Icon icon="dashboard"/> Dashboard
        </h2>
      </div>
    </Row>
  </Container>
)

export default DashboardPage;
