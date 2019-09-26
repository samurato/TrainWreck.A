import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import DashboardScreen from './Views/DashboardScreen';
import LoginScreen from './Views/LoginScreen';
import AdminDashBoardScreen from './Views/AdminDashBoard'
import CreateUserScreen from './Views/CreateUser.js'
import CreateTrainScreen from './Views/CreateTrain'
import AdminUserScreen from './Views/AdminUserScreen'
import AdminTrainScreen from './Views/AdminTrainScreen'
import SensorReadingScreen from './Views/SensorReadings'
import NotFound from './Views/NotFound'

class Routes extends Component {
  render()
  {
    console.log(this.props);
    return (
      <Switch>
        <Route exact path="/" component={AdminDashBoardScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/dashboard" component={DashboardScreen} />
        <Route exact path="/users" component={AdminUserScreen} />
        <Route exact path="/CreateUser" component={CreateUserScreen} />
        <Route exact path="/CreateTrain" component={CreateTrainScreen} />
        <Route exact path="/AdminTrainScreen" component={AdminTrainScreen} />
        <Route exact path="/Sensor" component={SensorReadingScreen} />
        <Route component={NotFound}/>
      </Switch>
    );
  }
}
export default Routes;
