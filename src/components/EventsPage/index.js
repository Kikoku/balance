import React from 'react';
import {
  Container,
  Row
} from '../Grid';
import Icon from '../Icon';

const EventsPage = () => (
  <Container>
    <Row>
      <div className="col-xs-12">
        <h2>
          <Icon icon="calendar"/> Events
        </h2>
      </div>
    </Row>
  </Container>
)

export default EventsPage;
