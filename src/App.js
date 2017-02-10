import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';

class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar location={this.props.location}/>
        {this.props.children}
      </div>
    );
  }
}

export default App;
