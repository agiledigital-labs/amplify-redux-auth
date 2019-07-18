import {
  applyMiddleware,
  compose,
  createStore as reduxCreateStore
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducer';
import { isNil } from 'lodash/fp';

declare global {
  interface Window {
    // See <https://github.com/zalmoxisus/redux-devtools-extension>.
    readonly __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: <R>(a: R) => R;
  }
}

export const sagaMiddleware = createSagaMiddleware({
  onError: error => {
    console.log(`There was an error in the Redux Saga: ${error}`);
  }
});

// Setup for the Redux DevTools Extension. See
// <https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup>.
const composeEnhancers = isNil(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  ? compose
  : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const createStore = () =>
  reduxCreateStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

export default createStore;
