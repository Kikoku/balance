import React from 'react';
import {
  Route,
  IndexRoute
} from 'react-router';

import RequireAuth from './components/RequireAuth';

import App from './App';
import HomePage from './components/HomePage';
import VenuesPage from './components/VenuesPage';
import LeaguesPage from './components/LeaguesPage';
import EventsPage from './components/EventsPage';
import DashboardPage from './components/DashboardPage'
import LoginPage from './components/LoginPage'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="venues" component={VenuesPage} />
    <Route path="leagues" component={LeaguesPage} />
    <Route path="events" component={EventsPage} />
    <Route path="dashboard" component={RequireAuth(DashboardPage, 'organization')} />
    <Route path="login" component={RequireAuth(LoginPage, 'guest')} />
  </Route>
)
