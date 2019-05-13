import {combineReducers} from 'redux';
import {AUTH_ACTION, USER_ACTION} from '../actions/auth';
import * as _ from 'lodash';
import {REST, Roles} from '../../rest-api';
import {FeatureFlag} from '../../feature-flags';

/// ***** TYPES ***** ///
export type UserProfile = REST.UserProfile & {
    username: string;
};

export type UserFeatureAccess = {
    rawFeatureFlags: REST.FeatureFlag[]
    flags: REST.FlagTag[],
};

/// **** REDUCERS **** ////

const unauthenticatedUser: UserProfile = {
    createdAt: '',
    role: Roles.GUEST,
    updatedAt: '',
    id: '',
    email: '',
    username: 'guest',
};
const user = (state = unauthenticatedUser, {type, payload}): UserProfile => {
    switch (type) {
        case USER_ACTION.FETCH_PROFILE:
            return state;
        case USER_ACTION.FETCH_PROFILE_SUCCESS:
            const data = payload;
            return {...data, username: data.email || 'guest'};
        case USER_ACTION.FETCH_PROFILE_FAILURE:
        case AUTH_ACTION.UNAUTHENTICATED:
            return unauthenticatedUser;
        default:
            return state;
    }
};

const defaultUserAccess: UserFeatureAccess = {
    rawFeatureFlags: [],
    flags: [],
};

const userFeatureAccess = (state = defaultUserAccess, {type, payload}): UserFeatureAccess => {

    const userProfile: REST.UserProfile = payload || {};

    switch (type) {
        case USER_ACTION.FETCH_PROFILE_SUCCESS:
            const {flags = []} = userProfile;
            return {
                rawFeatureFlags: flags,
                flags: flags.map((f) => f.tag),
            };
        case USER_ACTION.FETCH_PROFILE_FAILURE:
            return defaultUserAccess;
        default:
            return state;
    }
};

const isAuthenticating = (state = false, action) => {
    switch (action.type) {
        case AUTH_ACTION.LOGIN_REQUEST:
            return true;
        case AUTH_ACTION.LOGIN_SUCCESS:
        case AUTH_ACTION.LOGIN_FAILURE:
            return false;
        default:
            return state;
    }
};

const isAuthenticated = (state = false, action) => {
    switch (action.type) {
        case AUTH_ACTION.AUTHENTICATED:
            return true;
        case AUTH_ACTION.UNAUTHENTICATED:
            return false;
        default:
            return state;
    }
};

const authError = (state = null, {type, payload}) => {
    switch (type) {
        case AUTH_ACTION.LOGIN_FAILURE:
            return payload;
        case 'USER_LOGIN_SUCCESS':
            return null;
        default:
            return state;
    }
};

export const reducer = combineReducers({
    user,
    isAuthenticated,
    isAuthenticating,
    authError,
    userFeatureAccess,
});

export const getSelectors = (state) => ({
    getIsAuthenticating: (): boolean => state.isAuthenticating,
    getIsAuthenticated: (): boolean => state.isAuthenticated,
    getUser: (): UserProfile => state.user || unauthenticatedUser,
    getFeatureAccess: (): UserFeatureAccess => state.userFeatureAccess,
    getAuthError: (): string | null => _.toString(_.get(state.authError, 'errorMessage')),
    canAccessFeature: (feature: FeatureFlag): boolean => {
        const {flags} = state.userFeatureAccess;
        const isAdmin = _.includes(flags, FeatureFlag.ARCHITECT);
        return _.includes(flags, feature) || isAdmin;
    },
});
