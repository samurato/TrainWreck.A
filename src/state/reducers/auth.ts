import {AUTH_ACTION} from '../actions/auth'

const initialState = {loading: false, isAuthenticated: false, error: false, errorMessage: ""};

export const reducer = (state = initialState, {type, payload}: any) => {
    switch (type) {
        case AUTH_ACTION.AUTH_LOGIN_START:
            return {...initialState, loading: true, isAuthenticated: false};
        case AUTH_ACTION.AUTH_LOGIN_SUCCESS:
            return {...initialState, loading: false, isAuthenticated: true};
        case AUTH_ACTION.AUTH_LOGIN_FAILED:
            return {...initialState, error: true, errorMessage: payload.errorMessage};
        case AUTH_ACTION.AUTH_LOGOUT_START:
            return {...initialState, loading: true, isAuthenticated: true};
        case AUTH_ACTION.AUTH_LOGOUT_SUCCESS:
            return initialState;
        case AUTH_ACTION.AUTH_LOGOUT_FAILED:
            return {...initialState, isAuthenticated: true, error: true, errorMessage: payload.errorMessage};
        default:
            return state;
    }
};
