import * as React from 'react'
import {Route, Router} from 'react-router'
import { createBrowserHistory } from 'history';
import All from './pages/All'
import Single from './pages/Single'
const history = createBrowserHistory();


export default class UsersRouter extends React.Component<any> {
    public render() {
        return (
            <Router history={history}>
                <Route exact component={All} />
                <Route path="/single/:id" component={Single} />
            </Router>
        )
    }
}
