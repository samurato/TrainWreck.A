import {createAction} from "./CreateAction";

export const AUTH_ACTION = {
    USER_GET_ME_START: 'USER_GET_ME_START',
    USER_GET_ME_SUCCESS: 'USER_GET_ME_SUCCESS',
    USER_GET_ME_FAILED: 'USER_GET_ME_FAILED',
    USER_REMOVE_ME_START: 'USER_REMOVE_ME_START',
    USER_REMOVE_ME_SUCCESS: 'USER_REMOVE_ME_SUCCESS',
    USER_REMOVE_ME_FAILED: 'USER_REMOVE_ME_FAILED',
};

export const AuthAction = {
    getMeStart: () => createAction(AUTH_ACTION.USER_GET_ME_START),
    getMeFailed: (payload) => createAction(AUTH_ACTION.USER_GET_ME_FAILED, payload),
    getMeSuccess: () => createAction(AUTH_ACTION.USER_GET_ME_SUCCESS),
    removeMeStart: () => createAction(AUTH_ACTION.USER_REMOVE_ME_START),
    removeMeFailed: (payload) => createAction(AUTH_ACTION.USER_REMOVE_ME_FAILED, payload),
    removeMeSuccess: () => createAction(AUTH_ACTION.USER_REMOVE_ME_SUCCESS),
};

export const getMe = (username, password) => async (dispatch, getState) => {
    //const api = getApiClient();

    dispatch(AuthAction.getMeStart());

    try {
        // const me = await api.authService.login(username, password);
        dispatch(AuthAction.getMeSuccess());
        // dispatch(fetchUserProfile());
    } catch (error) {
        dispatch(AuthAction.getMeFailed({errorMessage: 'Could not get me', error: error}));
        throw error;
    }
};


export const removeMe = () => async (dispatch, getState) => {
    //const api = getApiClient();
    dispatch(AuthAction.removeMeStart());
    try {
        //LOGOUT
        dispatch(AuthAction.removeMeSuccess());
    } catch (error) {
        dispatch(AuthAction.removeMeFailed({errorMessage: 'Could not remove me', error: error}));
        throw error;
    }
};
