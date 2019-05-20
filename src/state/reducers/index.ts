import {combineReducers} from 'redux';

import {reducer as formReducer} from 'redux-form';
import {reducer as authReducer} from './auth';
import {reducer as usersReducer} from './users';


const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    users: usersReducer,
});

export default rootReducer;
