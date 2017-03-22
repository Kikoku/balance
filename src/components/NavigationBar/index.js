import React, { Component } from 'react';
import Icon from '../Icon';
import { Link } from 'react-router';
import logo from '../../balance.png';
import {
  Container,
} from '../Grid';
import Logout from '../Logout';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true
    }
  }
  _collapse() {
    this.setState({
      collapse: true
    })
  }
  _expand() {
    this.setState({
      collapse: false
    })
  }
  render() {
    let { viewer } = this.props;
    let guest = viewer ? viewer.roles.findIndex((role) => role.name === 'guest') > -1 : true;
    return (
      <Container fluid="true">
        <nav className="navbar navbar-inverse navbar-collapse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button className="navbar-toggle collapsed" onClick={ this.state.collapse ? () => this._expand() : () => this._collapse()}>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
              </button>
              <Link className="navbar-brand" to="/">
                <img src={logo} role="presentation"/>&nbsp;MTGBalance
              </Link>
            </div>
             <div id="navbar" className={`navbar-collapse collapse ${this.state.collapse ? '' : 'in'}`}>
              <ul className="nav navbar-nav navbar-right">
                <li onClick={() => this._collapse()}>
                  <Link to={`/venues/${viewer ? viewer.id : null}`} disabled={guest ? true : null}>
                  <Icon icon="user"/> {viewer ? viewer.name : null}
                  </Link>
                </li>
                <li className={this.props.location.pathname.includes('/venues') ? 'active' : ''} onClick={() => this._collapse()}>
                  <Link to="/venues">
                    <Icon icon="fort-awesome"/> Venues
                  </Link>
                </li>
                <li className={this.props.location.pathname.includes('/leagues') ? 'active' : ''} onClick={() => this._collapse()}>
                  <Link to="/leagues">
                    <Icon icon="tasks" /> Leagues
                  </Link>
                </li>
                <li className={this.props.location.pathname.includes('/events') ? 'active' : ''} onClick={() => this._collapse()}>
                  <Link to="/events">
                    <Icon icon="calendar" /> Events
                  </Link>
                </li>
                {
                  guest ?
                    null
                  :
                    <li className={this.props.location.pathname.includes('/dashboard') ? 'active' : ''} onClick={() => this._collapse()}>
                      <Link to="/dashboard">
                        <Icon icon="dashboard" /> Dashboard
                      </Link>
                    </li>
                }
                {
                  guest ?
                    <li className={this.props.location.pathname.includes('/login') ? 'active' : ''} onClick={() => this._collapse()}>
                      <Link to="/login">
                        <Icon icon="lock" /> Login
                      </Link>
                    </li>
                  :
                    <li onClick={() => this._collapse()}>
                      <Logout />
                    </li>
                }
              </ul>
            </div>
          </div>
        </nav>
      </Container>
    )
  }
}

export default NavigationBar;
