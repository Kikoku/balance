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

class NewOrganizationPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      error: null,
      organization: null
    }
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
    e.preventDefault();
    this.props.mutate({
      variables: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      },
    })
    .then(({ data }) => {
      const { organization, error } = data.newOrganization;
      self.setState({
        name: '',
        email: '',
        password: '',
        organization: organization,
        error:error
      })
      console.log(self.state);
    }).catch(error => {
      console.error(error);
    })
  }
  render() {
    const { name, email, password } = this.state;
    const { viewer } = this.props.data;
    return (
      <Row>
        <div className="col-sm-12">
          <h2>
            <Icon icon="dashboard"/> <Link to="/dashboard">Dashboard</Link> / New Organization
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
                  this.state.organization
                  ?
                    <div className="alert alert-success">
                     <button className="close" onClick={() => this._handleClose('organization')}>
                       <Icon icon="times" />
                     </button>
                      <strong>Success!</strong> <em>{this.state.organization.name}</em> has been created!
                    </div>
                  :
                    null
                }
                <InputGroup>
                  <InputGroupAddon>
                    <Icon icon="user" />
                  </InputGroupAddon>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => this._handleChange(e)}
                    placeholder="Company Name"
                  />
                </InputGroup>
                <InputGroup>
                  <InputGroupAddon>
                    <Icon icon="at" />
                  </InputGroupAddon>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => this._handleChange(e)}
                    placeholder="email@balance.com"
                  />
                </InputGroup>
                <InputGroup>
                  <InputGroupAddon>
                    <Icon icon="lock" />
                  </InputGroupAddon>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => this._handleChange(e)}
                    placeholder="password"
                  />
                </InputGroup>
                <button
                  className="btn btn-primary"
                  disabled={!(name && email && password)}
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

const newOrganizationMutation = gql`
  mutation newOrganization(
    $name: String!,
    $email: String!,
    $password: String!
  ) {
    newOrganization(input: {
      name: $name,
      email: $email,
      password: $password
    }) {
      error
      organization {
        name
      }
    }
  }
`

export default graphql(newOrganizationMutation)(NewOrganizationPage);
