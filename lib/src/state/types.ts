import { CognitoUser } from '@aws-amplify/auth';

export enum AuthAction {
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

export interface Login {
  readonly type: AuthAction.LOGIN;
  readonly payload: {
    readonly username: string;
    readonly password: string;
  };
}

export interface Logout {
  readonly type: AuthAction.LOGOUT;
}

export interface FetchCurrentUser {
  readonly type: AuthAction.FETCH_CURRENT_USER;
}

export interface CleanAuthState {
  readonly type: AuthAction.CLEAN_AUTH_STATE;
}

export interface LoginSuccess {
  readonly type: AuthAction.LOGIN_SUCCESS;
  readonly payload: { readonly userData: UserData };
}

export interface SetAuthError {
  readonly type: AuthAction.SET_AUTH_ERROR;
  readonly payload: { readonly errorMessage: string };
}

export interface SetUserError {
  readonly type: AuthAction.SET_USER_ERROR;
  readonly payload: { readonly errorMessage: string };
}

export interface SetCurrentUser {
  readonly type: AuthAction.SET_CURRENT_USER;
  readonly payload: { readonly userData: UserData };
}

export interface SetCognitoUser {
  readonly type: AuthAction.SET_COGNITO_USER;
  readonly payload: { readonly cognitoUser: CognitoUser };
}

export interface SetAuthStatus {
  readonly type: AuthAction.SET_AUTH_STATUS;
  readonly payload: { readonly status: AmplifyAuthStatus };
}

export interface SetNewPassword {
  readonly type: AuthAction.SET_NEW_PASSWORD;
  readonly payload: { readonly newPassword: string };
}

export interface ForgotPassword {
  readonly type: AuthAction.FORGOT_PASSWORD;
  readonly payload: { readonly username: string };
}

export interface ResetPassword {
  readonly type: AuthAction.FORGOT_PASSWORD;
  readonly payload: {
    readonly username: string;
    readonly code: string;
    readonly newPassword: string;
  };
}

export interface State {
  authState: AuthState;
}

export type AuthActionTypes =
  | Login
  | Logout
  | FetchCurrentUser
  | CleanAuthState
  | LoginSuccess
  | SetAuthError
  | SetUserError
  | SetCurrentUser
  | SetCognitoUser
  | SetAuthStatus
  | SetNewPassword
  | ForgotPassword
  | ResetPassword;
