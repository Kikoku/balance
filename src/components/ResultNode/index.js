import React from 'react';
import gql from 'graphql-tag';
import {
  ListGroupItem,
  Row,
} from '../Grid';
import Icon from '../Icon';

const ResultNode = ({ person, win, loss, draw, elo, change, place}) => (
  <ListGroupItem>
    <Row>
      <div className="col-sm-4 col-xs-6">
        {place} {person.last}, {person.first} {person.middle} {change > 9 ? <span style={{color:'#c0392b'}}><Icon icon="fire" /></span> : null}
      </div>
      <div className="col-sm-4 hidden-xs">
        {win} | {loss} | {draw}
      </div>
      <div className="col-sm-4 col-xs-6">
        {elo}
      </div>
    </Row>
  </ListGroupItem>
)

ResultNode.fragments = {
  results: gql`
    fragment ResultNode on ResultLeague {
      id
      person {
        first
        last
        middle
      }
      win
      loss
      draw
      elo
      change
    }
  `
}

export default ResultNode;
