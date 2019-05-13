import {AuthAction, fetchUserProfile} from "./actions-auth";

export const AUTH_ACTION = {
    AUTH_LOGIN_START: 'AUTH_LOGIN_START',
    AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
    AUTH_LOGIN_FAILED: 'AUTH_LOGIN_FAILED',
    AUTH_GET_USER_START: 'AUTH_GET_USER_START',
    AUTH_GET_USER_SUCCESS: 'AUTH_GET_USER_SUCCESS',
    AUTH_GET_USER_FAILED: 'AUTH_GET_USER_FAILED',

};

export const AuthAction = {
    loginStart: () => createAction(AUTH_ACTION.AUTH_LOGIN_START),
    loginFailed: (payload) => createAction(AUTH_ACTION.AUTH_LOGIN_FAILED, payload),
    loginSuccess: () => createAction(AUTH_ACTION.AUTH_LOGIN_SUCCESS),
    getUserStart: () => createAction(AUTH_ACTION.LOGIN_SUCCESS),
    getUserFailed: (payload) => createAction(AUTH_ACTION.LOGIN_FAILURE, payload),
    getUserSuccess: (payload) => createAction(AUTH_ACTION.LOGOUT_SUCCESS, payload),
};

export const login = (username, password) => async (dispatch, getState) => {
    //const api = getApiClient();

    dispatch(AuthAction.loginStart());

    try {
        // const me = await api.authService.login(username, password);
        dispatch(AuthAction.loginSuccess());
        // dispatch(fetchUserProfile());
    } catch (error) {
        dispatch(AuthAction.loginFailed({errorMessage: 'Could not login with the provided credentials', error: error}));
        throw error;
    }
};
