import React, { Component } from 'react';
import {
  Panel,
  PanelHeading,
  PanelBody,
  InputGroup,
  InputGroupAddon
} from '../Grid';
import Icon from '../Icon';
import SearchList from '../SearchList';

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  _handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { query } = this.state;
    return (
      <Panel>
        <PanelHeading>
          <Icon icon="search"/> Search
        </PanelHeading>
        <PanelBody>
          <form>
            <InputGroup>
              <InputGroupAddon>
                <Icon icon="search" />
              </InputGroupAddon>
              <input
                className="form-control"
                type="text"
                name="query"
                placeholder="Search..."
                value={query}
                onChange={(e) => this._handleChange(e)}
              />
            </InputGroup>
          </form>
        </PanelBody>
        <SearchList query={this.state.query}/>
      </Panel>
    )
  }
}

export default SearchPanel;
