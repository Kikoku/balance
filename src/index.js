import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  browserHistory
} from 'react-router';
import Routes from './Routes';
import './index.css';
import ApolloClient, {
  createNetworkInterface
} from 'apollo-client';
import {
  ApolloProvider,
} from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: process.env.NETWORK_INTERFACE_URI || 'http://localhost:8080'
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if(!req.options.headers) {
      req.options.headers = {};
    }

    const token = localStorage.getItem('access_token');
    req.options.headers.authorization = token ? token : null;
    next();
  }
}])

const client = new ApolloClient({
  networkInterface,
});

const RootApp = () => (
  <ApolloProvider client={client}>
    <Router
      routes={Routes}
      history={browserHistory}
    />
  </ApolloProvider>
)

ReactDOM.render(
  <RootApp />,
  document.getElementById('root')
);
