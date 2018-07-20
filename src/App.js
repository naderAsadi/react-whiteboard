import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Board from './containers/Board/Board';

class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/" exact component={Home}/>
        <Route path="/board" component={Board}/>
      </Layout>
    );
  }
}

export default App;
