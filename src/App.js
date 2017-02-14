import React, { Component } from 'react';
import {
  graphql
} from 'react-apollo';
import gql from 'graphql-tag';
import './App.css';
import NavigationBar from './components/NavigationBar';


const App = ({ data, children, location}) => (
  <div>
    <NavigationBar
      location={location}
      viewer={data.viewer}
    />
    {children}
  </div>
)

const Viewer = gql`
  query Viewer {
    viewer {
      id
      name
      roles {
        name
      }
    }
  }
`

export default graphql(Viewer)(App);
