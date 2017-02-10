import React from 'react';
import {
  Container,
  Row
} from '../Grid';
import Icon from '../Icon';

const LoginPage = () => (
  <Container>
    <Row>
      <div className="col-xs-12">
        <h2>
          <Icon icon="lock"/> Login
        </h2>
      </div>
    </Row>
  </Container>
)

export default LoginPage;
