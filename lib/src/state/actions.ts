import { action } from 'typesafe-actions';
import { AuthActionTypes, UserData, AmplifyAuthStatus } from './types';
import { CognitoUser } from '@aws-amplify/auth';

export const login = (username: string, password: string) =>
  action(AuthActionTypes.LOGIN, { username, password });

export const logout = () => action(AuthActionTypes.LOGOUT);

export const fetchCurrentUser = () =>
  action(AuthActionTypes.FETCH_CURRENT_USER);

export const cleanAuthState = () => action(AuthActionTypes.CLEAN_AUTH_STATE);

export const loginSuccess = (userData: UserData) =>
  action(AuthActionTypes.LOGIN_SUCCESS, { userData });

export const setAuthError = (errorMessage: string) =>
  action(AuthActionTypes.SET_AUTH_ERROR, { errorMessage });

export const setUserError = (errorMessage: string) =>
  action(AuthActionTypes.SET_USER_ERROR, { errorMessage });

export const setCurrentUser = (userData: UserData) =>
  action(AuthActionTypes.SET_CURRENT_USER, { userData });

export const setCognitoUser = (cognitoUser: CognitoUser) =>
  action(AuthActionTypes.SET_COGNITO_USER, { cognitoUser });

export const setAuthStatus = (status: AmplifyAuthStatus) =>
  action(AuthActionTypes.SET_AUTH_STATUS, { status });

export const setNewPassword = (newPassword: string) =>
  action(AuthActionTypes.SET_NEW_PASSWORD, { newPassword });

export const forgotPassword = (username: string) =>
  action(AuthActionTypes.FORGOT_PASSWORD, { username });

export const resetPassword = (
  username: string,
  code: string,
  newPassword: string
) => action(AuthActionTypes.FORGOT_PASSWORD, { username, code, newPassword });
