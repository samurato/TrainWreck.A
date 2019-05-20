import * as React from 'react';
import Home from '../routes/Home';
import * as Auth from '../routes/Auth';
import * as Users from '../routes/Users';

export interface IRouteConfig {
    path: string;
    exact?: boolean;
    isPublic?: boolean;
    component: React.ComponentClass;
}

const defaultRoutes: IRouteConfig[] = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/auth',
        component: Auth.Router,
    },
    {
        path: '/users',
        component: Users.Router,
    },
];

export const RouteConfigContext = React.createContext<IRouteConfig[]>(defaultRoutes);

export const RouteConfigProvider: React.FC<{ routes?: IRouteConfig[] }> = ({routes, ...rest}) => {
    return <RouteConfigContext.Provider value={routes || defaultRoutes} {...rest}/>;
};

export const RouteConfigConsumer = RouteConfigContext.Consumer;

