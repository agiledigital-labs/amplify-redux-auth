import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import LoginForm from '../LoginForm';
import SetNewPasswordForm from '../SetNewPasswordForm';
import { State, AuthState, AmplifyAuthStatus } from 'amplify-redux-auth';
import { theme } from './styles';

interface CustomAuthProps {
  readonly authState: AuthState;
}

const mapStateToProps = (state: State) => ({
  authState: state.authState
});

const CustomAuth = ({ authState }: CustomAuthProps) => (
  <MuiThemeProvider theme={theme}>
    {authState.authStatus === AmplifyAuthStatus.signIn ? (
      <LoginForm logoText={'Custom Auth Example'} />
    ) : (
      <></>
    )}
    {authState.authStatus === AmplifyAuthStatus.requireNewPassword ? (
      <SetNewPasswordForm />
    ) : (
      <></>
    )}
  </MuiThemeProvider>
);

export default compose<CustomAuthProps, {}>(
  connect(
    mapStateToProps,
    null
  )
)(CustomAuth);
