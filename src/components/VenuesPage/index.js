import React from 'react';
import {
  Container,
  Row
} from '../Grid';
import Icon from '../Icon';
import VenuesContainer from '../VenuesContainer';

const VenuesPage = () => (
  <Container>
    <Row>
      <div className="col-xs-12">
        <h2>
          <Icon icon="fort-awesome"/> Venues
        </h2>
      </div>
      <div className="col-xs-12">
        <VenuesContainer />
      </div>
    </Row>
  </Container>
)

export default VenuesPage;
