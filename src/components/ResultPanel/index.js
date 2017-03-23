import React from 'react';
import {
  Panel,
  PanelHeading,
  ListGroup,
  ListGroupItem,
  Row
} from '../Grid';
import Icon from '../Icon';
import ResultNodeHeading from '../ResultNodeHeading';
import ResultNode from '../ResultNode';

const ResultPanel = ({ users, loadMoreUsers, hasNextPage }) => (
  <Panel>
    <PanelHeading>
      <Icon icon="sort-numeric-asc"/> Results
    </PanelHeading>
    <ListGroup>
      <ResultNodeHeading />
        {
          users.map((user, i) => <ResultNode {...user.node} place={i+1} key={user.node.id}/> )
        }
        {
          hasNextPage ?
          <ListGroupItem>
            <Row>
              <div
                className="col-md-12"
                style={{
                  textAlign: 'center'
                }}
              >
                <span
                  className="btn btn-primary"
                  onClick={loadMoreUsers}
                >
                  Load More...
                </span>
              </div>
            </Row>
          </ListGroupItem>
          : null
        }
    </ListGroup>
  </Panel>
)

export default ResultPanel;
