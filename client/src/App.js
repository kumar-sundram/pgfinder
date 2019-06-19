import React, { Component } from 'react';
import './App.css'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Register from './users/register'
import Login from './users/login'
import Logout from './users/logout'

import PgShow from './component/pg/pgShow'
import PgList from './component/pg/listPg'
import PgNew from './component/pg/newPg'
import PgEdit from './component/pg/editPg'
import Help from './users/help';
import Home from './users/home'
import Navbar from './component/home/navbar'
import PrivateRoute from '../src/component/home/privateroute'
class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <div>
          <Navbar />
          <Switch>
            <PrivateRoute path='/' component={Home} exact={true} />
            <Route path="/users/register" component={Register} exact={true} />
            <Route path="/users/login" component={Login} exact={true} />
            <PrivateRoute path="/users/logout" component={Logout} exact={true} />
            <PrivateRoute path='/help' component={Help} exact={true} />
            <PrivateRoute path="/pg" component={PgList} exact={true} />
            <PrivateRoute path="/pg/new" component={PgNew} exact={true} />
            <PrivateRoute path="/pg/:id" component={PgShow} exact={true} />
            <PrivateRoute path="/pg/edit/:id" component={PgEdit} exact={true} />
          </Switch>

        </div >
      </BrowserRouter >

    );
  }
}

export default App;
