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

// We want to move away from importing from data.js
const EndpointAPIURL = "http://trains.benfranzi.com:8080";

/* 
 * (Ideally) implement authentication: 
 * 
 * https://blog.strapi.io/protected-routes-and-authentication-with-react-and-node-js/
*/

function GetUsers() {
  let userList = {};

  // check if authenticated

  // run the API
  let get_yo_fetch_here;
  userList = {"dummy": "dummy_user"};

  return userList;
}

function ModifyUser(props) {
  return <ModifyUserScreen users={GetUsers()} />
}

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
          <Route exact path="/modify-user" render={ModifyUser} /> // Note that when using a function, have "render={}" not "component={}"
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
