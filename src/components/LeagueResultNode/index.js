import React from 'react';
import gql from 'graphql-tag';
import {
  ListGroupItem,
  Row,
} from '../Grid';
import {
  Link,
} from 'react-router'

const LeagueResultNode = ({ person, win, loss, draw, elo, change}) => (
  <ListGroupItem>
    <Row>
      <div className="col-sm-4 col-xs-6">
        {person.last}, {person.first} {person.middle}
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

LeagueResultNode.fragments = {
  results: gql`
    fragment LeagueResultNode on ResultLeague {
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

export default LeagueResultNode;
