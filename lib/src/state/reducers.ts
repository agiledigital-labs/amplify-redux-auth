import { createReducer } from 'typesafe-actions';
import { AuthActionTypes, AuthState, AmplifyAuthStatus } from './types';

const initialState: AuthState = {
  error: undefined,
  userError: undefined,
  currentUser: undefined,
  cognitoUser: undefined,
  loggedIn: false,
  checkingAuth: false,
  authStatus: AmplifyAuthStatus.signIn
};

const reducers = createReducer<AuthState>(initialState, {
  [AuthActionTypes.LOGOUT]: () => initialState,
  [AuthActionTypes.LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    currentUser: action.payload.userData,
    loggedIn: true,
    error: undefined
  }),
  [AuthActionTypes.FETCH_CURRENT_USER]: state => ({
    ...state,
    checkingAuth: true
  }),
  [AuthActionTypes.SET_AUTH_ERROR]: (state, action) => ({
    ...state,
    currentUser: undefined,
    cognitoUser: undefined,
    loggedIn: false,
    checkingAuth: false,
    error: action.payload.errorMessage
  }),
  [AuthActionTypes.SET_USER_ERROR]: (state, action) => ({
    ...state,
    checkingAuth: false,
    userError: action.payload.errorMessage
  }),
  [AuthActionTypes.SET_CURRENT_USER]: (state, action) => ({
    ...state,
    loggedIn: true,
    checkingAuth: false,
    currentUser: action.payload.userData
  }),
  [AuthActionTypes.SET_COGNITO_USER]: (state, action) => ({
    ...state,
    cognitoUser: action.payload.cognitoUser
  }),
  [AuthActionTypes.SET_AUTH_STATUS]: (state, action) => ({
    ...state,
    checkingAuth: false,
    authStatus: action.payload.status,
    error: undefined
  })
});

export default reducers;
