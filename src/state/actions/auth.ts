import {createAction} from "./CreateAction";

export const AUTH_ACTION = {
    AUTH_LOGIN_START: 'AUTH_LOGIN_START',
    AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
    AUTH_LOGIN_FAILED: 'AUTH_LOGIN_FAILED',
    AUTH_LOGOUT_START: 'AUTH_LOGOUT_START',
    AUTH_LOGOUT_SUCCESS: 'AUTH_LOGOUT_SUCCESS',
    AUTH_LOGOUT_FAILED: 'AUTH_LOGOUT_FAILED',
};

export const AuthAction = {
    loginStart: () => createAction(AUTH_ACTION.AUTH_LOGIN_START),
    loginFailed: (payload) => createAction(AUTH_ACTION.AUTH_LOGIN_FAILED, payload),
    loginSuccess: () => createAction(AUTH_ACTION.AUTH_LOGIN_SUCCESS),
    logoutStart: () => createAction(AUTH_ACTION.AUTH_LOGOUT_START),
    logoutFailed: (payload) => createAction(AUTH_ACTION.AUTH_LOGOUT_SUCCESS, payload),
    logoutSuccess: () => createAction(AUTH_ACTION.AUTH_LOGOUT_FAILED),
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


export const logout = () => async (dispatch, getState) => {
    //const api = getApiClient();
    dispatch(AuthAction.logoutStart());
    try {
        //LOGOUT
        dispatch(AuthAction.logoutSuccess());
    } catch (error) {
        dispatch(AuthAction.logoutFailed({errorMessage: 'Could not login with the provided credentials', error: error}));
        throw error;
    }
};
