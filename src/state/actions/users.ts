import {createAction} from "./CreateAction";

export const USERS_ACTION = {
    USER_GET_ME_START: 'USER_GET_ME_START',
    USER_GET_ME_SUCCESS: 'USER_GET_ME_SUCCESS',
    USER_GET_ME_FAILED: 'USER_GET_ME_FAILED',
    USER_REMOVE_ME_START: 'USER_REMOVE_ME_START',
    USER_REMOVE_ME_SUCCESS: 'USER_REMOVE_ME_SUCCESS',
    USER_REMOVE_ME_FAILED: 'USER_REMOVE_ME_FAILED',
};

export const AuthAction = {
    getMeStart: () => createAction(USERS_ACTION.USER_GET_ME_START),
    getMeFailed: (payload) => createAction(USERS_ACTION.USER_GET_ME_FAILED, payload),
    getMeSuccess: (payload) => createAction(USERS_ACTION.USER_GET_ME_SUCCESS, payload),
    removeMeStart: () => createAction(USERS_ACTION.USER_REMOVE_ME_START),
    removeMeFailed: (payload) => createAction(USERS_ACTION.USER_REMOVE_ME_FAILED, payload),
    removeMeSuccess: () => createAction(USERS_ACTION.USER_REMOVE_ME_SUCCESS),
};

const getMe = () => async (dispatch, getState) => {
    //const api = getApiClient();

    dispatch(AuthAction.getMeStart());

    try {
        // const me = await api.authService.login(username, password);
        dispatch(AuthAction.getMeSuccess({email: "test@test.com", username: "test", role: "admin"}));
        // dispatch(fetchUserProfile());
    } catch (error) {
        dispatch(AuthAction.getMeFailed({errorMessage: 'Could not get me', error: error}));
        throw error;
    }
};


const removeMe = () => async (dispatch, getState) => {
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

export default {
    getMe,
    removeMe,
}
