import React, {
  Component
} from 'react';
import {
  Container,
  Row,
  InputGroup,
  InputGroupAddon
} from '../Grid';
import {
  graphql,
} from 'react-apollo';
import gql from 'graphql-tag';
import Icon from '../Icon';
import update from 'immutability-helper';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null
    }
  }

  _handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.mutate({
      variables: {
        email: this.state.email,
        password: this.state.password
      },
      updateQueries: {
        Viewer: (prev, { mutationResult }) => {
          const viewer = mutationResult.data.login.organization;
          const { error } = mutationResult.data.login;
          if (error || true) {
            return update(prev, {
              viewer: {
                $set: viewer
              }
            })
          }
        }
      }
    })
    .then(({ data }) => {
      data.login.error || true ? localStorage.setItem('access_token', data.login.token.access_token) : null;
    }).catch(error => {
      console.log('error');
    })
  }

  render() {

    let { email, password } = this.state

    return (
      <Container>
        <Row>
          <div className="col-sm-12">
            <h2>
              <Icon icon="lock"/> Login
            </h2>
          </div>
        </Row>
        <Row>
          <div className="col-sm-12">
            <form
              onSubmit={(e) => this._handleSubmit(e)}
            >
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
              >
                Login
              </button>
            </form>
          </div>
        </Row>
      </Container>
    )
  }
}

const loginMutation = gql`
  mutation loginMutation(
    $email: String!,
    $password: String!
  ) {
    login(input: {
      email: $email,
      password: $password
    }) {
      error
      token {
        access_token
      }
      organization {
        id
        name
        roles {
          name
        }
      }
    }
  }
`

export default graphql(loginMutation)(LoginPage);
