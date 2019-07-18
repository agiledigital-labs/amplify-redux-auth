import { combineReducers } from 'redux';
import { authState } from 'amplify-redux-auth';

export const rootReducer = combineReducers({
  authState
});
