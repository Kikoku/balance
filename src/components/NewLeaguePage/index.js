import React, { Component } from 'react';
import {
  graphql,
} from 'react-apollo';
import gql from 'graphql-tag';
import {
  Panel,
  PanelHeading,
  PanelBody,
  Row,
  InputGroup,
  InputGroupAddon
} from '../Grid';
import Icon from '../Icon';
import {
  Link,
} from 'react-router';
import DashboardNav from '../DashboardPage/DashboardNav';

class NewLeaguePage extends Component {
  constructor(props) {
    super(props)
    const today = new Date();
    let offsetDate = new Date();
    offsetDate.setDate(offsetDate.getDate() + 30);
    this.today = this._formatDate(today)
    this.offsetDate = this._formatDate(offsetDate);
    this.state = {
      title: '',
      startdate: this.today,
      enddate: this.offsetDate,
      error: null,
      league: null
    }
  }

  _formatDate(date) {
    return `${(date.getFullYear())}-${this._handleSingleValue((date.getMonth() +1))}-${this._handleSingleValue(date.getDate())}`;
  }

  _handleSingleValue(value) {
    return value < 10 ? `0${value}` : value;
  }

  _handleClose(alertType) {
    this.setState({
      [alertType]: null
    })
  }

  _handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  _handleSubmit(e) {
    const self = this;
    const { title, startdate, enddate } = this.state;
    e.preventDefault();
    this.props.mutate({
      variables: {
        title: title,
        startdate: startdate,
        enddate: enddate
      },
    })
    .then(({ data }) => {
      const { league, error } = data.newLeague;
      self.setState({
        title: '',
        startdate: this.today,
        enddate: this.offsetDate,
        league: league,
        error: error
      })
    }).catch(error => {
      console.error(error);
    })
  }
  render() {
    const { title, startdate, enddate } = this.state;
    const { viewer } = this.props.data;
    return (
      <Row>
        <div className="col-sm-12">
          <h2>
            <Icon icon="dashboard"/> <Link to="/dashboard">Dashboard</Link> / New League
          </h2>
        </div>
        <div className="col-sm-4">
          <DashboardNav location={this.props.location} viewer={viewer} />
        </div>
        <div className="col-sm-8">
          <Panel>
            <PanelHeading>

            </PanelHeading>
            <PanelBody>
              <form
                onSubmit={(e) => this._handleSubmit(e)}
              >
                {
                  this.state.error
                  ?
                    <div className="alert alert-danger">
                      <button className="close" onClick={() => this._handleClose('error')}>
                        <Icon icon="times" />
                      </button>
                      <strong>Oh Snap!</strong> {this.state.error}
                    </div>
                  :
                    null
                }
                {
                  this.state.league
                  ?
                    <div className="alert alert-success">
                     <button className="close" onClick={() => this._handleClose('league')}>
                       <Icon icon="times" />
                     </button>
                      <strong>Success!</strong> <Link to={`/leagues/${this.state.league.id}`}><em>{this.state.league.title}</em></Link> has been created!
                    </div>
                  :
                    null
                }
                <InputGroup>
                  <InputGroupAddon>
                    <Icon icon="tasks" />
                  </InputGroupAddon>
                  <input
                    className="form-control"
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => this._handleChange(e)}
                    placeholder="League Title"
                  />
                </InputGroup>
                <InputGroup>
                  <InputGroupAddon>
                    <Icon icon="calendar" />
                  </InputGroupAddon>
                  <input
                    type="date"
                    className="form-control"
                    name="startdate"
                    value={startdate}
                    placeholder={startdate}
                    onChange={(e) => this._handleChange(e)}
                  />
                </InputGroup>
                <InputGroup>
                  <InputGroupAddon>
                    <Icon icon="calendar" />
                  </InputGroupAddon>
                  <input
                    type="date"
                    className="form-control"
                    name="enddate"
                    value={enddate}
                    placeholder={enddate}
                    min={this.state.startdate}
                    onChange={(e) => this._handleChange(e)}
                  />
                </InputGroup>
                <button
                  className="btn btn-primary"
                  disabled={!(title && startdate && enddate)}
                >
                  Submit
                </button>
              </form>
            </PanelBody>
          </Panel>
        </div>
      </Row>
    )
  }
}

const newLeagueMutation = gql`
  mutation newLeague(
    $title: String!,
    $startdate: String!,
    $enddate: String!
  ) {
    newLeague(input: {
      title: $title,
      startdate: $startdate,
      enddate: $enddate
    }) {
      error
      league {
        id
        title
      }
    }
  }
`

export default graphql(newLeagueMutation)(NewLeaguePage);
