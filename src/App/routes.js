

import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import DashboardScreen from './View/DashboardScreen';




class Routes extends Component {

    render()
    {
        return (
            <div>
            <Switch>
                <Route path="/" component={DashboardScreen}/>
            </Switch>
            </div>
        );
    }

}

export default Routes;