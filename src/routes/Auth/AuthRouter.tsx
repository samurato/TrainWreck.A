import * as React from 'react'
import {Route, Router} from 'react-router'
import Login from './pages/Login'
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();


export default class AuthRouter extends React.Component<any> {
    public render() {
        return (
            <Router history={history}>
                <Route exact component={Login} />
            </Router>
        )
    }
}
