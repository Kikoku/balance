import React from 'react';
import {
  Link,
} from 'react-router'

const DashboardNav = ({ location, viewer }) => {
  let admin = viewer ? viewer.roles.findIndex((role) => role.name === 'admin') > -1 : false;
  return (
  <ul className="nav nav-pills nav-stacked well">
    <li className={location.pathname === '/dashboard' ? 'active' : null}>
      <Link to="/dashboard">
        Dashboard
      </Link>
    </li>
    {
      admin
      ?
        <li className={location.pathname.includes('new-organization') ? 'active' : null}>
          <Link to="/dashboard/new-organization">
            New Organization
          </Link>
        </li>
      :
        null
    }
    <li className={location.pathname.includes('new-league') ? 'active' : null}>
      <Link to="/dashboard/new-league">
        New Leauge
      </Link>
    </li>
    <li className={location.pathname.includes('new-league') ? 'active' : null}>
      <Link to="/dashboard/new-event">
        New Event
      </Link>
    </li>
  </ul>
)}

export default DashboardNav;
