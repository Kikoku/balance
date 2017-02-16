import React from 'react';
import {
  Container,
  Row
} from '../Grid';
import Icon from '../Icon';

const LeaguesPage = () => (
  <Container>
    <Row>
      <div className="col-sm-12">
        <h2>
          <Icon icon="tasks"/> Leagues
        </h2>
      </div>
    </Row>
  </Container>
)

export default LeaguesPage;
