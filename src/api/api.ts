import * as _ from 'lodash'; //TODO: REMOVE LODASH
import axios, {AxiosInstance} from 'axios';
import {AuthService} from './services/AuthService';
import {UsersService} from './services/UsersService';
import {AuthAction} from '../state/actions/auth'

const printDebug = (groupLabel, request) => {

    console.group(groupLabel);
    const {method, url} = request;
    if (method || url) {
        console.log(`${request.method}: ${request.url} `);
    }
    const printObj = (obj) => {
        const {data} = obj;
        if (!data) {
            return;
        }
        if (data.constructor.name === 'FormData') {
            console.log('  Form data payload');
            for (const pair of data.entries()) {
                console.log('    ' + pair[0] + ', ' + pair[1]);
            }
        } else {
            console.log(data);
        }
    };
    printObj(request);
    console.groupEnd();
};

export class APIClient {
    public readonly baseURL: string;

    public readonly authService: AuthService;
    public readonly userService: UsersService;

    private readonly axiosInstance: AxiosInstance;

    public constructor(baseURL: string) {
        this.baseURL = baseURL;
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
        });

        if (process.env.NODE_ENV === 'development') {
            this.axiosInstance.interceptors.request.use((request) => {
                    printDebug('Request', request);
                    return request;
                },
            );
        }
        this.axiosInstance.interceptors.response.use(
            async (response) => {
                if (process.env.NODE_ENV === 'development') {
                    printDebug('Response', response);
                }
                return response;
            },
            (error) => {
                console.log(error);
                const {response} = error;
                let errorMessage = error.message;
                if (response) {
                    errorMessage = response.statusText;
                    errorMessage = _.get(response.data, 'message', errorMessage);
                    errorMessage = JSON.stringify(errorMessage);
                }
                throw new Error(errorMessage);
            },
        );

        this.authService = new AuthService(this.axiosInstance);
        this.userService = new UsersService(this.axiosInstance);
    }

    private store = null;

    public setReduxStore = (store) => {
        this.store = store;

        this.axiosInstance.interceptors.response.use(async (response) => {
            // Do something with response data
            if (response.status === 401) {
                console.log('Got 401');
                if (this.store) {
                    console.log('Redux store is configured, dispatching USER_UNAUTHENTICATED message');
                    await store.dispatch(AuthAction.logoutSuccess());
                }
            }
            return response;
        }, (error) => {
            // Do something with response error
            return Promise.reject(error);
        });
    }

    public getFileURL = (file) => {

        if (!file) {
            return null;
        }

        if (file.url) {
            return file.url;
        }

        return `${this.baseURL}/files/${file.id}`;
    }
}
