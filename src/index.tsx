import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {RouteConfigProvider} from './config/RouteConfig';
import 'semantic-ui-css/semantic.min.css';
import {Provider as ReduxProvider} from 'react-redux'
import ConfigureStore from './state/ConfigureStore'
import {createApiClient} from './api'
import config from './api/config';

const store = ConfigureStore();
export const apiClient = createApiClient(config.apiEndpont);

ReactDOM.render(
    <BrowserRouter>
        <RouteConfigProvider>
            <ReduxProvider store={store}>
                <App/>
            </ReduxProvider>
        </RouteConfigProvider>
    </BrowserRouter>,
    document.getElementById('root'));
