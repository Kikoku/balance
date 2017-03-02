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
  InputGroupAddon,
  InputGroupButton,
} from '../Grid';
import Icon from '../Icon';
import {
  Link,
} from 'react-router';
import DashboardNav from '../DashboardPage/DashboardNav';
import {
  mountNewFile
} from './updateHelper'
import LeagueSelect from './LeagueSelect';

class NewEventPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filename: '',
      error: '',
      event: '',
      logs: '',
      players: '',
      matches: '',
      leagueId: '',
      uploaded: ''
    }
  }

  _handleClose(alertType) {
    this.setState({
      [alertType]: ''
    })
  }

  async _handleMountFile(e) {
    const filename = e.target.files[0].name
    const { event, logs, players, matches } = await mountNewFile(e.target.files[0]);
    this.setState({
      filename,
      logs,
      players,
      event,
      matches
    })
  }

  _handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  _handleSubmit(e) {
    let { event, logs, players, matches, leagueId, filename } = this.state;
    event = {
      ...event,
      iscasuallreportonly: event.iscasuallreportonly ? event.iscasuallreportonly : false
    };

    e.preventDefault();
    this.props.mutate({
      variables: {
        leagueId,
        event,
        logs,
        players,
        matches
      }
    }).then(({ data }) => {
      const { event, error } = data.newEvent;
      if (error) {
        this.setState({
          error: error
        })
      } else {
        this.setState({
          filename: '',
          error: error,
          event: '',
          logs: '',
          players: '',
          matches: '',
          leagueId: this.state.leagueId,
          uploaded: event.title
        })
      }
    }).catch(error => {
      console.error(error)
    })
  }

  render() {
    const { viewer } = this.props.data;
    const { error, upload, filename, event, players, matches, leagueId, logs } = this.state;
    return (
      <Row>
        <div className="col-sm-12">
          <h2>
            <Icon icon="dashboard"/> <Link to="/dashboard">Dashboard</Link> / New Event
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
                  this.state.uploaded
                  ?
                    <div className="alert alert-success">
                     <button className="close" onClick={() => this._handleClose('uploaded')}>
                       <Icon icon="times" />
                     </button>
                      <strong>Success!</strong> <em>{this.state.uploaded}</em> has been created!
                    </div>
                  :
                    null
                }
                <input
                  id="uploadButton"
                  type="file"
                  style={{display: 'none'}}
                  onChange={(e) => this._handleMountFile(e)}
                  accept=".wer"
                />
                <InputGroup>
                  <InputGroupAddon>
                    <Icon icon="file" />
                  </InputGroupAddon>
                  <input
                    type="text"
                    value={this.state.filename}
                    className="form-control"
                    style={{backgroundColor: '#fff'}}
                    placeholder="example.wer"
                    readOnly
                  />
                  <InputGroupButton>
                    <span
                      className="btn btn-primary"
                      onClick={() => {document.getElementById('uploadButton').click()}}
                    >
                      Browse...
                    </span>
                  </InputGroupButton>
                </InputGroup>
                <InputGroup>
                  <InputGroupAddon>
                    <Icon icon="tasks" />
                  </InputGroupAddon>
                  {
                    viewer
                    ?
                      <LeagueSelect org={viewer} _handleChange={(e) => this._handleChange(e)}/>
                    :
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw></i>" />
                  }
                </InputGroup>
                <InputGroup>
                  <InputGroupAddon>
                    <Icon icon="font" />
                  </InputGroupAddon>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.event ? this.state.event.title : ''}
                    style={{backgroundColor: '#fff'}}
                    placeholder="Title"
                    readOnly
                  />
                </InputGroup>
                <InputGroup>
                  <InputGroupAddon>
                    <Icon icon="calendar" />
                  </InputGroupAddon>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.event ? this.state.event.startdate : ''}
                    style={{backgroundColor: '#fff'}}
                    placeholder="Date"
                    readOnly
                  />
                </InputGroup>
                <InputGroup>
                  <InputGroupAddon>
                    #
                  </InputGroupAddon>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.event ? this.state.event.sanctionnumber : ''}
                    style={{backgroundColor: '#fff'}}
                    placeholder="Sanction Number"
                    readOnly
                  />
                </InputGroup>
                <InputGroup>
                  <InputGroupAddon>
                    <Icon icon="users" />
                  </InputGroupAddon>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.players ? this.state.players.length : ''}
                    style={{backgroundColor: '#fff'}}
                    placeholder="Attendance"
                    readOnly
                  />
                </InputGroup>
                <button
                  className="btn btn-primary"
                  disabled={ !(filename && event && players && matches && leagueId && logs) }
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

const newEventMutation = gql`
  mutation NewEvent(
    $event: EventInput!,
    $leagueId: String!,
    $logs: [LogInput]!,
    $players: [PlayerInput]!,
    $matches: [MatchInput]!
  ) {
    newEvent(input: {
      event: $event,
      leagueId: $leagueId,
      logs: $logs,
      players: $players,
      matches: $matches
    }) {
      error
      event {
        title
      }
    }
  }
`

export default graphql(newEventMutation)(NewEventPage);
