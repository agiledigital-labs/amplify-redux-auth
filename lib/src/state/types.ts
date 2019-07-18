import { CognitoUser } from '@aws-amplify/auth';

export enum AuthActionTypes {
  LOGIN = 'AUTH/LOGIN',
  LOGOUT = 'AUTH/LOGOUT',
  LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS',
  FETCH_CURRENT_USER = 'AUTH/FETCH_CURRENT_USER',
  SET_NEW_PASSWORD = 'AUTH/SET_NEW_PASSWORD',
  FORGOT_PASSWORD = 'AUTH/FORGOT_PASSWORD',
  RESET_PASSWORD = 'AUTH/RESET_PASSWORD',
  SET_AUTH_ERROR = 'AUTH/SET_AUTH_ERROR',
  SET_CURRENT_USER = 'AUTH/SET_CURRENT_USER',
  SET_COGNITO_USER = 'AUTH/SET_COGNITO_USER',
  SET_AUTH_STATUS = 'AUTH/SET_AUTH_STATUS',
  CLEAN_AUTH_STATE = 'AUTH/CLEAN_AUTH_STATE',
  SET_USER_ERROR = 'AUTH/SET_USER_ERROR'
}

export interface UserData {
  username: string;
  attributes: Map<string, string>;
}

export interface AuthState {
  readonly error?: string;
  readonly userError?: string;
  readonly currentUser?: UserData;
  readonly cognitoUser?: CognitoUser;
  readonly loggedIn: boolean;
  readonly checkingAuth: boolean;
  readonly authStatus: AmplifyAuthStatus;
}

export interface State {
  authState: AuthState;
}

/**
 * Authentication state that provided by AWS Amplify.
 * @see https://github.com/aws/aws-amplify/blob/master/docs/media/authentication_guide.md#example-show-your-app-only-after-user-sign-in
 *
 * With the addition of resetPassword and requireNewPassword.
 */
export enum AmplifyAuthStatus {
  signIn = 'signIn',
  signUp = 'signUp',
  confirmSignIn = 'confirmSignIn',
  confirmSignUp = 'confirmSignUp',
  forgotPassword = 'forgotPassword',
  verifyContact = 'verifyContact',
  signedIn = 'signedIn',
  resetPassword = 'resetPassword',
  requireNewPassword = 'requireNewPassword',
  mfaRequired = 'requireNewPassword'
}
