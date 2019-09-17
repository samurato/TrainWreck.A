import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import DashboardScreen from './Views/DashboardScreen';
import LoginScreen from './Views/LoginScreen';
import AdminDashBoardScreen from './Views/AdminDashBoard'
import CreateUserScreen from './Views/CreateUser.js'
import CreateTrainScreen from './Views/CreateTrain'
import AdminUserScreen from './Views/AdminUserScreen'
import AdminTrainScrenn from './Views/AdminTrainScreen'
import SensorReadingScreen from './Views/SensorReadings'
import NotFound from './Views/NotFound'

class Routes extends Component {
  render()
  {
    
    return (
      <Switch>
        <Route exact path="/" component={AdminDashBoardScreen} exact />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/dashboard" component={DashboardScreen} exact />
        <Route path="/CreateUser" component={CreateUserScreen} exact />
        <Route path="/CreateTrain" component={CreateTrainScreen} exact />
        <Route path="/AdminUserScreen" component={AdminUserScreen} exact />
        <Route path="/AdminTrainScreen" component={AdminTrainScrenn} exact />
        <Route path="/Sensor" component={SensorReadingScreen} exact />
        <Route component={NotFound}/>
      </Switch>
    );
  }
}
export default Routes;
