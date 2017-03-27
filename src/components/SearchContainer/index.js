import React from 'react';
import {
  Row
} from '../Grid';
import Icon from '../Icon';
import SearchPanel from '../SearchPanel';

const SearchContainer = ({}) => (
  <Row>
    <div className="col-sm-12">
      <h2>
        <Icon icon="search"/> Search
      </h2>
    </div>
    <div className="col-sm-12">
      <SearchPanel />
    </div>
  </Row>
)

export default SearchContainer;
