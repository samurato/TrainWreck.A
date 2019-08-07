

import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import DashboardScreen from './View/DashboardScreen';
import LoginScreen from './View/LoginScreen';
import AdminDashBoardScreen from './View/AdminDashBoard'
import CreateUserScreen from './View/CreateUser'
import CreateTrainScreen from './View/CreateTrain'
import AdminUserScreen from './View/AdminUserScreen'
import AdminTrainScrenn from './View/AdminTrainScreen'
import SensorReadingScreen from './View/SensorReadings'

class Routes extends Component {

    render()
    {
        return (
            <div>
            <Switch>

                <Route path="/" component={AdminDashBoardScreen } exact/>
                <Route path="/login" component={LoginScreen } exact/>
                <Route path="/dashboard" component = {DashboardScreen} exact />
                <Route path = "/CreateUser" component = {CreateUserScreen} exact />
                <Route path = "/CreateTrain" component = {CreateTrainScreen} exact />
                <Route path = "/AdminUserScreen" component = {AdminUserScreen} exact />
                <Route path = "/AdminTrainScreen" component = {AdminTrainScrenn} exact />
                <Route path = "/Sensor" component = {SensorReadingScreen} exact />
            </Switch>
            </div>
        );
    }

}

export default Routes;
