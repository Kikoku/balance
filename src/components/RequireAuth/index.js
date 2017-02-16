import React, { Component } from 'react';
import {
  graphql
} from 'react-apollo';
import gql from 'graphql-tag';

export default (ComposedComponent, AuthScheme = 'admin') => {
  class Authentication extends Component {

    componentWillUpdate(nextProps) {
      switch (AuthScheme) {
        case 'admin':
          if(nextProps.data.viewer.roles.findIndex((role) => role.name === 'admin') === -1) {
            nextProps.router.push('/login')
          }
          break;
        case 'organization':
          if(nextProps.data.viewer.roles.findIndex((role) => role.name === 'admin') === -1) {
            nextProps.router.push('/login')
          }
          break;
        case 'guest':
          if(nextProps.data.viewer.roles.findIndex((role) => role.name === 'guest') === -1) {

            nextProps.router.push('/dashboard')
          }
          break;
        default:

      }

    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      )
    }
  }

  const Viewer = gql`query Viewer { viewer { name, roles {name}} }`

  const componentWithData = graphql(Viewer)(Authentication);

  return componentWithData;

}
