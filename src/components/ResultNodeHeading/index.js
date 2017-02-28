import React from 'react';
import {
  Row,
  ListGroupItem
} from '../Grid';

const ResultNodeHeading = () => (
  <ListGroupItem>
    <Row>
      <div className="col-xs-1 text-center">
        #
      </div>
      <div className="col-xs-4">
        Player
      </div>
      <div className="col-xs-3 text-center">
        W | L | D
      </div>
      <div className="col-xs-4">
        Elo
      </div>
    </Row>
  </ListGroupItem>
)

export default ResultNodeHeading;
