import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import LoginForm from '../LoginForm';
import SetNewPasswordForm from '../SetNewPasswordForm';
import { State, AuthState, AmplifyAuthStatus } from '../../state';
import { theme } from './styles';
import ForgotPasswordForm from '../ForgotPasswordForm';
import ResetPasswordForm from '../ResetPasswordForm';

interface AuthOuterProps {
  readonly logoText: string;
}

interface AuthProps extends AuthOuterProps {
  readonly authState: AuthState;
}

const mapStateToProps = (state: State) => ({
  authState: state.authState
});

const Auth = ({ logoText, authState }: AuthProps) => (
  <MuiThemeProvider theme={theme}>
    {authState.authStatus === AmplifyAuthStatus.signIn ? (
      <LoginForm logoText={logoText} />
    ) : (
      <></>
    )}
    {authState.authStatus === AmplifyAuthStatus.requireNewPassword ? (
      <SetNewPasswordForm />
    ) : (
      <></>
    )}
    {authState.authStatus === AmplifyAuthStatus.forgotPassword ? (
      <ForgotPasswordForm />
    ) : (
      <></>
    )}
    {authState.authStatus === AmplifyAuthStatus.resetPassword ? (
      <ResetPasswordForm />
    ) : (
      <></>
    )}
  </MuiThemeProvider>
);

export default compose<AuthProps, AuthOuterProps>(
  connect(
    mapStateToProps,
    null
  )
)(Auth);
