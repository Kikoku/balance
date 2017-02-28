import React from 'react';
import {
  Panel,
  PanelHeading,
  ListGroup,
  ListGroupItem
} from '../Grid';
import Icon from '../Icon';
import ResultNodeHeading from '../ResultNodeHeading';
import ResultNode from '../ResultNode';

const ResultPanel = ({ users }) => (
  <Panel>
    <PanelHeading>
      <Icon icon="sort-numeric-asc"/> Results
    </PanelHeading>
    <ListGroup>
      <ResultNodeHeading />
        {
          users.map((user, i) => <ResultNode {...user.node} place={i+1} key={user.node.id}/> )
        }
    </ListGroup>
  </Panel>
)

export default ResultPanel;
