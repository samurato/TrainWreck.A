import React from 'react';
import {Route, Switch} from 'react-router'
import AppLayout from './layout/AppLayout'

class AppWrapper extends React.Component<any> {
    public render() {
        return (
            <Switch>
                <Route component={AppRoot}/>
            </Switch>
        );
    }
}

class AppRoot extends React.Component {
    public render() {
        return (
            <AppLayout {...this.props}/>
        );
    }
}

export default AppWrapper;
