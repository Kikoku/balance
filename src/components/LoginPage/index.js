import React, {
  Component
} from 'react';
import {
  Container,
  Row
} from '../Grid';
import {
  graphql,
} from 'react-apollo';
import gql from 'graphql-tag';
import Icon from '../Icon';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  _handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state);
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.mutate()
    .then(({ data }) => {
      console.log(data);
      localStorage.setItem('access_token', data.login.token.access_token)
    }).catch(error => {
      console.log('error');
    })
  }

  render() {

    console.log(this.props);

    let { value } = this.state

    return (
      <Container>
        <Row>
          <div className="col-xs-12">
            <h2>
              <Icon icon="lock"/> Login
            </h2>
          </div>
        </Row>
        <Row>
          <div className="col-xs-12">
            <form
              onSubmit={(e) => this._handleSubmit(e)}
            >
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={value}
                  onChange={(e) => this._handleChange(e)}
                />
              </div>
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
  mutation loginMutation {
    login(input: {
    }) {
      token {
        access_token
      }
      organization {
        name
      }
    }
  }
`

export default graphql(loginMutation)(LoginPage);
