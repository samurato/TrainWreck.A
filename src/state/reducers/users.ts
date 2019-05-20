import {USERS_ACTION} from '../actions/users';

const initialState = {loading: false, email: "", username: "", role: ""};

export const reducer = (state = initialState, {type, payload}: any) => {
    switch (type) {
        case USERS_ACTION.USER_REMOVE_ME_START:
        case USERS_ACTION.USER_GET_ME_START:
            return {...state, loading: true};

        case USERS_ACTION.USER_GET_ME_SUCCESS:
            return {loading: false, email: payload.email, username: payload.username, role: payload.role};
        case USERS_ACTION.USER_REMOVE_ME_SUCCESS:
            return initialState;

        case USERS_ACTION.USER_GET_ME_FAILED:
        case USERS_ACTION.USER_REMOVE_ME_FAILED:
            return {...state, error: true, errorMessage: payload.errorMessage};
        default:
            return state;
    }
};
