import React, { Component } from 'react';
import {
  graphql
} from 'react-apollo';
import gql from 'graphql-tag';
import './App.css';
import NavigationBar from './components/NavigationBar';

class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar
          location={this.props.location}
          viewer={this.props.data.viewer}
        />
        {this.props.children}
      </div>
    );
  }
}

const Viewer = gql`query Viewer { viewer { name, roles {name}} }`

const componentWithData = graphql(Viewer)(App);

export default componentWithData;
