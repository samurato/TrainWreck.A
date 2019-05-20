import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


const composeEnhancers = composeWithDevTools({
    //TODO: REMOVE THIS IN PROD
});

export default function configureStore(initialState?: any) {
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(thunk),
        ),

    );
}
