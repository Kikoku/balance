import React from 'react';
import gql from 'graphql-tag';
import {
  ListGroupItem,
  Row,
} from '../Grid';
import Icon from '../Icon';
import ResultChangeFlag from '../ResultChangeFlag';

const ResultNode = ({ person, win, loss, draw, elo, change, place}) => (
  <ListGroupItem>
    <Row>
      <div className="col-xs-1 text-center">
        {place}
      </div>
      <div className="col-xs-4">
        {person.last}, {person.first.substring(0,1)}<span className="hidden-xs">{person.first.substring(1,person.first.length)}</span><span className="hidden-sm hidden-md hidden-lg">.</span> <span className="hidden-xs">{person.middle.substring(0,1)}{person.middle ? '.' : ''}</span> {change > 9 ? <span style={{color:'#c0392b'}}><Icon icon="free-code-camp" /></span> : null}
      </div>
      <div className="col-xs-3 text-center">
        {win} | {loss} | {draw}
      </div>
      <div className="col-xs-4">
        {elo} <ResultChangeFlag change={change} />
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
