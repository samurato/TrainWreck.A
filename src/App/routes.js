

import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import DashboardScreen from './View/DashboardScreen';
import AdminScreen from './View/AdminScreen'




class Routes extends Component {

    render()
    {
        return (
            <div>
            <Switch>
                <Route path='/' component={AdminScreen}/>
                {/*<Route path='/AdminScreen' component={AdminScreen}/>*/}
            </Switch>
            </div>
        );
    }

}

export default Routes;
