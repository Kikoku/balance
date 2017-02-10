import React from 'react';
import {
  Container,
  Row
} from '../Grid';
import Icon from '../Icon';

const HomePage = () => (
  <Container>
    <Row>
      <div className="col-xs-12">
        <h2>
          <Icon icon="home"/> Home
        </h2>
      </div>
    </Row>
  </Container>
)

export default HomePage;
