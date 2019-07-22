import { action } from 'typesafe-actions';
import { AuthAction, UserData, AmplifyAuthStatus } from './types';
import { CognitoUser } from '@aws-amplify/auth';

export const login = (username: string, password: string) =>
  action(AuthAction.LOGIN, { username, password });

export const logout = () => action(AuthAction.LOGOUT);

export const fetchCurrentUser = () => action(AuthAction.FETCH_CURRENT_USER);

export const cleanAuthState = () => action(AuthAction.CLEAN_AUTH_STATE);

export const loginSuccess = (userData: UserData) =>
  action(AuthAction.LOGIN_SUCCESS, { userData });

export const setAuthError = (errorMessage: string) =>
  action(AuthAction.SET_AUTH_ERROR, { errorMessage });

export const setUserError = (errorMessage: string) =>
  action(AuthAction.SET_USER_ERROR, { errorMessage });

export const setCurrentUser = (userData: UserData) =>
  action(AuthAction.SET_CURRENT_USER, { userData });

export const setCognitoUser = (cognitoUser: CognitoUser) =>
  action(AuthAction.SET_COGNITO_USER, { cognitoUser });

export const setAuthStatus = (status: AmplifyAuthStatus) =>
  action(AuthAction.SET_AUTH_STATUS, { status });

export const setNewPassword = (newPassword: string) =>
  action(AuthAction.SET_NEW_PASSWORD, { newPassword });

export const forgotPassword = (username: string) =>
  action(AuthAction.FORGOT_PASSWORD, { username });

export const resetPassword = (
  username: string,
  code: string,
  newPassword: string
) => action(AuthAction.FORGOT_PASSWORD, { username, code, newPassword });
