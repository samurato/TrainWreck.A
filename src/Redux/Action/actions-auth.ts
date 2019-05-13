import {getApiClient} from '../api-client';
import {createAction} from './createAction';
import {REST} from '../../rest-api';

//// ***** ACTIONS ******** ////

export const AUTH_ACTION = {
    LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
    AUTHENTICATED: 'USER_AUTHENTICATED',
    UNAUTHENTICATED: 'USER_UNAUTHENTICATED',
    LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USER_LOGIN_FAILURE',
    LOGOUT_SUCCESS: 'USER_LOGOUT_FAILURE',
    LOGOUT_FAILURE: 'USER_LOGOUT_FAILURE',
};

export const AuthAction = {
    loginRequest: () => createAction(AUTH_ACTION.LOGIN_REQUEST),
    authenticated: () => createAction(AUTH_ACTION.AUTHENTICATED),
    unauthenticated: () => createAction(AUTH_ACTION.UNAUTHENTICATED),
    loginSuccess: (payload) => createAction(AUTH_ACTION.LOGIN_SUCCESS, payload),
    loginFailure: (payload) => createAction(AUTH_ACTION.LOGIN_FAILURE, payload),
    logoutSuccess: () => createAction(AUTH_ACTION.LOGOUT_SUCCESS),
    logoutFailure: (payload) => createAction(AUTH_ACTION.LOGOUT_FAILURE),
};

export const USER_ACTION = {
    FETCH_PROFILE: 'USER_PROFILE_FETCH_REQUEST',
    FETCH_PROFILE_SUCCESS: 'USER_PROFILE_FETCH_SUCCESS',
    FETCH_PROFILE_FAILURE: 'USER_PROFILE_FETCH_FAILURE',
};

export const UserAction = {
    fetchProfile: () => createAction(USER_ACTION.FETCH_PROFILE),
    fetchProfileSuccess: (userProfile: REST.UserProfile) => createAction(USER_ACTION.FETCH_PROFILE_SUCCESS, userProfile),
    fetchProfileFailure: (payload: { error?, errorMessage? }) => createAction(USER_ACTION.FETCH_PROFILE_FAILURE, payload),
};

/// **** Funtions *****////

export const validateToken = () => (dispatch) => {
    const api = getApiClient();

    if (!api.authService.loggedIn()) {
        dispatch(logout());
    } else {
        dispatch(extend());
    }
};

export const login = (username, password) => async (dispatch, getState) => {
    const api = getApiClient();

    dispatch(AuthAction.loginRequest());

    try {
        const me = await api.authService.login(username, password);
        dispatch(AuthAction.authenticated());
        dispatch(AuthAction.loginSuccess(me));
        dispatch(fetchUserProfile());
    } catch (error) {
        dispatch(AuthAction.unauthenticated());
        dispatch(AuthAction.loginFailure({errorMessage: 'Could not login with the provided credentials', error: error}));
        throw error;
    }
};

export const extend = () => async (dispatch, getState) => {
    const api = getApiClient();

    dispatch(AuthAction.loginRequest());

    try {
        const me = await api.authService.extend();
        dispatch(AuthAction.authenticated());
        dispatch(AuthAction.loginSuccess(me));
        dispatch(fetchUserProfile());
    } catch (error) {
        dispatch(logout());
    }
};

export const logout = () => async (dispatch) => {
    const api = getApiClient();

    try {
        await api.authService.logout();
        dispatch(AuthAction.unauthenticated());
        dispatch(AuthAction.logoutSuccess());
    } catch (error) {
        dispatch(AuthAction.unauthenticated());
        dispatch(AuthAction.logoutFailure({errorMessage: error.message || 'Something went wrong.'}));
        throw error;
    }
};

export const fetchUserProfile = () => async (dispatch): Promise<REST.UserProfile> => {
    const api = getApiClient();

    dispatch(UserAction.fetchProfile());

    try {
        const me = await api.authService.fetchMe();
        dispatch(AuthAction.authenticated());
        dispatch(UserAction.fetchProfileSuccess(me));
        return me;
    } catch (error) {
        dispatch(AuthAction.unauthenticated());
        dispatch(UserAction.fetchProfileFailure({error, errorMessage: error.message || 'Something went wrong.'}));
        throw error;
    }
};

export const passwordForgot = (email: string) => async (dispatch) => {
    const api = getApiClient();
    return api.authService.passwordForgot(email);
};

export const passwordReset = (token: string, newPassword: string) => async (dispatch) => {
    const api = getApiClient();
    const resp = await api.authService.passwordReset(token, newPassword);
    if (api.authService.loggedIn()) {
        dispatch(AuthAction.authenticated());
    } else {
        dispatch(AuthAction.unauthenticated());
    }

    await fetchUserProfile()(dispatch);
};

export const authActions = {
    login,
    extend,
    logout,
    fetchUserProfile,
    passwordForgot,
    validateToken,
    passwordReset,
};

export interface AuthActionProps {
    login: (username, password) => Promise<any>;
    logout: () => Promise<any>;
    fetchUserProfile: () => Promise<REST.UserProfile>;
    passwordForgot: (email: string) => Promise<any>;
    validateToken: () => Promise<any>;
    extend: () => Promise<any>;
    passwordReset: (token: string, newPassword: string) => Promise<any>;
}
