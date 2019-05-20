import {APIClient} from './api';
export {APIClient} from './api';
export * from './types';

let api: APIClient;

export const createApiClient = (apiBaseURL: string): APIClient => {
    if (!api) {
        api = new APIClient(apiBaseURL);
    }
    return api;
};

export const getApiClient = (): APIClient => {
    return api;
};
