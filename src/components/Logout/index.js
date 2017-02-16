import React, { Component } from 'react';
import {
  Link
} from 'react-router'
import {
  graphql,
} from 'react-apollo';
import gql from 'graphql-tag';
import Icon from '../Icon';
import update from 'immutability-helper';

const Logout = ({mutate}) => {
  console.log(mutate);
  return (
  <Link to="/" onClick={(e) => {
    const self = this;
    mutate({
      variables: {
        organization: 'logout'
      },
      updateQueries: {
        Viewer: (prev, { mutationResult }) => {
          return update(prev, {
            viewer: {
              $set: {
                __typename: "Organization",
                id: null,
                name: "Guest",
                roles: [
                  {
                    __typename: "Role",
                    name: "guest"
                  }
                ]
              }
            }
          })
        }
      },
    }).then(({ data }) => {
      localStorage.removeItem('access_token');
    }).catch(error => {
      console.log('error');
      console.error(error);
    })
  }}>
    <Icon icon="unlock-alt" /> Logout
  </Link>
)}

const logoutMutation = gql`
  mutation logout(
    $organization: String
  ) {
    logout(input: {
      organization: $organization
    }) {
      success
    }
  }
`

export default graphql(logoutMutation)(Logout);
