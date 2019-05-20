import * as React from 'react';
import {withRouter, RouteComponentProps, Switch, RouteProps, Route} from 'react-router';
import NotFound from './NotFound';
import {RouteConfigContext} from '../config/RouteConfig'
import {compose} from 'redux'

class AppContent extends React.Component<RouteComponentProps> {

    /**
     * Context provides a way to pass data through the component tree without
     * having to pass props down manually at every level.
     *
     * The react router rendered pages is being passed to this component
     * through context
     *
     * https://reactjs.org/docs/context.html
     */
    public context!: React.ContextType<typeof RouteConfigContext>;

    public render() {
        return (
            <div>
                <Switch>
                    {this.context.map((r, index) => {
                        const component = r.component;
                        if (!component) {
                            console.error('component not provided', r);
                            return null;
                        }
                        return <RouteContainer exact={r.exact} key={index} path={r.path} component={component}/>;
                    })}
                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

AppContent.contextType = RouteConfigContext;

interface IPrivateRouteProps extends RouteProps {
    component: React.ComponentClass;
}

class MainRouteContainer extends React.Component<IPrivateRouteProps /* & AUTH HERE*/> {
    public render() {
        const {component: Component, ...rest} = this.props;

        return (
            <Route
                {...rest}
                render={(props) =>
                    <Component {...props} />
                }
            />
        );
    }
}

const RouteContainer = compose(
)(MainRouteContainer) as React.ComponentType<IPrivateRouteProps>;

export default withRouter(AppContent);
