import React, { Component } from 'react';
import './App.css';
import Users from '../src/Components/Users/Users';
import Layout from '../src/Containers/Layout/Layout'
import {Route} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Route path="/" exact render={props=><Users {...props} />}/>
          {/*<Route path="/addNew" exact component={AddUser}/>
          <Route path="/:id" component={EditUser}/>*/}
        </Layout>
      </div>
    );
  }
}

export default App;
