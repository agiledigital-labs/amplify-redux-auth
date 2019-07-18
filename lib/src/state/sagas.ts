import { Auth } from 'aws-amplify';
import { all, fork, put, takeLatest, apply, select } from 'redux-saga/effects';
import { AuthActionTypes, AmplifyAuthStatus, State } from './types';
import {
  setCognitoUser,
  setAuthStatus,
  loginSuccess,
  setAuthError,
  setCurrentUser,
  setUserError
} from './actions';

const errorMessage = err => {
  if (typeof err === 'string') {
    return err;
  }

  if (err && err.message) {
    return err.message;
  }

  return 'Error occurred during auth.';
};

/**
 * Clean authentication state after sign out event fired from AWS Amplify.
 * @see https://aws-amplify.github.io/docs/js/hub#authentication-events
 */
const cleanAuthState = () => {
  window.localStorage.clear();
  window.sessionStorage.clear();
};

function* handleLogout() {
  cleanAuthState();
}

function* handleLogin(action) {
  const { username, password } = action.payload;
  try {
    const cognitoUser = yield apply(Auth, Auth.signIn, [username, password]);

    yield put(setCognitoUser(cognitoUser));

    if (cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
      yield put(setAuthStatus(AmplifyAuthStatus.requireNewPassword));
    } else if (cognitoUser.challengeName === 'SMS_MFA') {
      yield put(setAuthStatus(AmplifyAuthStatus.mfaRequired));
    } else {
      const currentUser = yield apply(Auth, Auth.currentUserInfo, []);
      yield put(loginSuccess(currentUser));
      yield put(setAuthStatus(AmplifyAuthStatus.signedIn));
    }
  } catch (err) {
    console.error(err);
    yield put(setAuthError(errorMessage(err)));
  }
}

/**
 * Touches the current authenticated user, if failed to retrieve the user info, user is not logged in.
 */
function* handleFetchCurrentUser() {
  try {
    const currentUser = yield apply(Auth, Auth.currentAuthenticatedUser, [
      undefined
    ]);
    yield put(setCurrentUser(currentUser));
    yield put(setAuthStatus(AmplifyAuthStatus.signedIn));
  } catch (err) {
    console.error(err);
    yield put(setUserError(errorMessage(err)));
  }
}

function* handleSetNewPassword(action) {
  const { newPassword } = action.payload;
  try {
    const cognitoUser = yield select(
      (state: State) => state.authState.cognitoUser
    );

    yield apply(Auth, Auth.completeNewPassword, [cognitoUser, newPassword, []]);

    const currentUser = yield apply(Auth, Auth.currentUserInfo, []);

    yield put(loginSuccess(currentUser));
    yield put(setAuthStatus(AmplifyAuthStatus.signedIn));
  } catch (err) {
    console.error(err);
    yield put(setAuthError(errorMessage(err)));
  }
}

function* handleForgotPassword(action) {
  const { username } = action.payload;
  try {
    yield apply(Auth, Auth.forgotPassword, [username]);
    yield put(setAuthStatus(AmplifyAuthStatus.resetPassword));
  } catch (err) {
    console.error(err);
    yield put(setAuthError(errorMessage(err)));
  }
}

export function* handleResetPassword(action) {
  const { username, code, newPassword } = action.payload;
  try {
    yield apply(Auth, Auth.forgotPasswordSubmit, [username, code, newPassword]);
    yield put(setAuthStatus(AmplifyAuthStatus.signIn));
  } catch (err) {
    console.error(err);
    yield put(setAuthError(errorMessage(err)));
  }
}

function* watchSearchRequest() {
  yield takeLatest(AuthActionTypes.LOGIN, handleLogin);
  yield takeLatest(AuthActionTypes.LOGOUT, handleLogout);
  yield takeLatest(AuthActionTypes.FETCH_CURRENT_USER, handleFetchCurrentUser);
  yield takeLatest(AuthActionTypes.CLEAN_AUTH_STATE, cleanAuthState);
  yield takeLatest(AuthActionTypes.SET_NEW_PASSWORD, handleSetNewPassword);
  yield takeLatest(AuthActionTypes.FORGOT_PASSWORD, handleForgotPassword);
  yield takeLatest(AuthActionTypes.RESET_PASSWORD, handleResetPassword);
}

function* sagas() {
  yield all([fork(watchSearchRequest)]);
}

export default sagas;
