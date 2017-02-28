import React from 'react';
import {
  Row,
  ListGroupItem
} from '../Grid';

const ResultNodeHeading = () => (
  <ListGroupItem>
    <Row>
      <div className="col-sm-4 col-xs-6">
        Player
      </div>
      <div className="col-sm-4 hidden-xs">
        Win | Loss | Draw
      </div>
      <div className="col-sm-4 col-xs-6">
        Elo
      </div>
    </Row>
  </ListGroupItem>
)

export default ResultNodeHeading;
