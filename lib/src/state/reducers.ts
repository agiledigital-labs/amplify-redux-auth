import { Reducer } from 'redux';
import {
  AmplifyAuthStatus,
  AuthAction,
  AuthActionTypes,
  AuthState
} from './types';

const initialState: AuthState = {
  error: undefined,
  userError: undefined,
  currentUser: undefined,
  cognitoUser: undefined,
  loggedIn: false,
  checkingAuth: false,
  authStatus: AmplifyAuthStatus.signIn
};

const reducer: Reducer<AuthState, AuthActionTypes> = (
  state = initialState,
  action: AuthActionTypes
) => {
  switch (action.type) {
    case AuthAction.LOGOUT: {
      return state;
    }
    case AuthAction.LOGIN_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload.userData,
        loggedIn: true,
        error: undefined
      };
    }
    case AuthAction.FETCH_CURRENT_USER: {
      return { ...state, checkingAuth: true };
    }
    case AuthAction.SET_AUTH_ERROR: {
      return {
        ...state,
        currentUser: undefined,
        cognitoUser: undefined,
        loggedIn: false,
        checkingAuth: false,
        error: action.payload.errorMessage
      };
    }
    case AuthAction.SET_USER_ERROR: {
      return {
        ...state,
        checkingAuth: false,
        userError: action.payload.errorMessage
      };
    }
    case AuthAction.SET_CURRENT_USER: {
      return {
        ...state,
        loggedIn: true,
        checkingAuth: false,
        currentUser: action.payload.userData
      };
    }
    case AuthAction.SET_COGNITO_USER: {
      return { ...state, cognitoUser: action.payload.cognitoUser };
    }
    case AuthAction.SET_AUTH_STATUS: {
      return {
        ...state,
        checkingAuth: false,
        authStatus: action.payload.status,
        error: undefined
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
