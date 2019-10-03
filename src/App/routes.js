import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import DashboardScreen from './Views/DashboardScreen';
import LoginScreen from './Views/LoginScreen';
import AdminDashBoardScreen from './Views/AdminDashBoard';
import EditUserLanding from './Views/EditUserLanding.js';
import CreateUserScreen from './Views/CreateUser.js';
import ModifyUserScreen from './Views/ModifyUser.js';
import AdminUserScreen from './Views/AdminUserScreen';
import NotFound from './Views/NotFound';
import TestScreen from './Views/TestScreen.js';

function Test(props) {
  return <TestScreen test="this is passed from routes.js" />;
}

// Authentication: https://blog.strapi.io/protected-routes-and-authentication-with-react-and-node-js/

class Routes extends Component {
  render()
  {
    if (localStorage.getItem('token')) {
      return (
        <Switch>
          <Route exact path="/" component={AdminDashBoardScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/dashboard" component={DashboardScreen} />
          <Route exact path="/users" component={AdminUserScreen} />
          <Route exact path="/edit-users" component={EditUserLanding} />
          <Route exact path="/add-user" component={CreateUserScreen} />
          <Route exact path="/modify-user" component={ModifyUserScreen} />
          <Route exact path="/test" render={Test} />
          <Route component={NotFound}/>
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route component={LoginScreen} />
        </Switch>
      )
    }
  }
}
export default Routes;
