import React, { Component } from 'react';
import Icon from '../Icon';
import { Link } from 'react-router';
import logo from '../../balance.png';
import {
  Container,
} from '../Grid';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true
    }
  }
  _toggleExpand() {
    this.setState({
      collapse: !this.state.collapse
    })
  }
  render() {
    return (
      <Container fluid="true">
        <nav className="navbar navbar-inverse navbar-collapse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button className="navbar-toggle collapsed" data-target="#navbar" onClick={()=>this._toggleExpand()}>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
              </button>
              <Link className="navbar-brand" to="/">
                <img src={logo} role="presentation"/>&nbsp;Balance
              </Link>
            </div>
             <div id="navbar" className={`navbar-collapse collapse ${this.state.collapse ? '' : 'in'}`}>
              <ul className="nav navbar-nav navbar-right">
                <li className={this.props.location.pathname === '/venues' ? 'active' : ''}>
                  <Link to="/venues">
                    <Icon icon="fort-awesome"/> Venues
                  </Link>
                </li>
                <li className={this.props.location.pathname === '/leagues' ? 'active' : ''}>
                  <Link to="/leagues">
                    <Icon icon="tasks" /> Leagues
                  </Link>
                </li>
                <li className={this.props.location.pathname === '/events' ? 'active' : ''}>
                  <Link to="/events">
                    <Icon icon="calendar" /> Events
                  </Link>
                </li>
                {
                  this.props.viewer && this.props.viewer.roles.includes({name: 'guest'}) ?
                    <li className={this.props.location.pathname === '/dashboard' ? 'active' : ''}>
                      <Link to="/dashboard">
                        <Icon icon="dashboard" /> Dashboard
                      </Link>
                    </li>
                  :
                    ''
                }
                {
                  this.props.viewer && this.props.viewer.roles.includes({name: 'guest'}) ?
                    <li className={this.props.location.pathname === '/login' ? 'active' : ''}>
                      <Link to="/login">
                        <Icon icon="unlock-alt" /> Logout
                      </Link>
                    </li>
                  :
                    <li className={this.props.location.pathname === '/login' ? 'active' : ''}>
                      <Link to="/login">
                        <Icon icon="lock" /> Login
                      </Link>
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
