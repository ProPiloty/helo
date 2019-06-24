import React, {Component} from 'react';
import './App.css';
import routes from './routes';
import {withRouter} from 'react-router-dom';

// COMPONENTS
import Nav from './Components/Nav/Nav';

class App extends Component {
  render(){
    return (
      <div className="App">
        {this.props.location.pathname === '/' ?
          null
          :
          <Nav />
        }
        {routes}
      </div>
    )
  }
}

export default withRouter(App);
