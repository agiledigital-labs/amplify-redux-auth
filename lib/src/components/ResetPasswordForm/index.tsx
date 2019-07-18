import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Card, CardActions, Button, TextField } from '@material-ui/core';
import { bindActionCreators, Dispatch } from 'redux';
import {
  setAuthStatus,
  State,
  AmplifyAuthStatus,
  resetPassword
} from '../../state';
import withStyles, { ClassNameMap } from '@material-ui/styles/withStyles';
import authStyles from '../Auth/styles';
import ErrorMessage from '../ErrorMessage';

interface ResetPasswordFormProps {
  readonly error?: string;
  readonly classes: ClassNameMap;
  readonly inputs: {
    readonly username: string;
    readonly newPassword: string;
    readonly code: string;
  };
  readonly resetPassword: (
    username: string,
    code: string,
    newPassword: string
  ) => void;
  readonly setAuthStatus: (status: AmplifyAuthStatus) => void;
  readonly handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const mapStateToProps = (state: State) => ({
  error: state.authState.error
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAuthStatus: bindActionCreators(setAuthStatus, dispatch),
  resetPassword: bindActionCreators(resetPassword, dispatch)
});

const ResetPasswordForm = ({
  classes,
  setAuthStatus,
  error,
  inputs,
  handleInputChange,
  resetPassword
}: ResetPasswordFormProps) => (
  <div className={classes.main}>
    <Card className={classes.card}>
      <div className={classes.title}>
        <h2>Set your new password</h2>
      </div>
      <ErrorMessage errorMessage={error} />
      <form
        className={classes.form}
        onSubmit={e => {
          e.preventDefault();
          resetPassword(inputs.username, inputs.code, inputs.newPassword);
        }}>
        <div className={classes.form}>
          <div className={classes.input}>
            <TextField
              required
              id="username"
              name="username"
              label="Username"
              value={inputs.username}
              fullWidth
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.input}>
            <TextField
              required
              id="code"
              name="code"
              label="Code"
              value={inputs.code}
              fullWidth
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.input}>
            <TextField
              required
              id="new-password"
              name="newPassword"
              label="New Password"
              type="password"
              value={inputs.newPassword}
              fullWidth
              onChange={handleInputChange}
            />
          </div>
          <CardActions>
            <Button variant="outlined" color="primary" type="submit" fullWidth>
              Reset
            </Button>
          </CardActions>
          <CardActions>
            <Button
              fullWidth
              type="button"
              onClick={() => setAuthStatus(AmplifyAuthStatus.signIn)}>
              Remembered your password?
            </Button>
          </CardActions>
        </div>
      </form>
    </Card>
  </div>
);

export default compose<ResetPasswordFormProps, {}>(
  withStyles(authStyles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStateHandlers(
    {
      inputs: {
        username: '',
        code: '',
        newPassword: ''
      }
    },
    {
      handleInputChange: ({ inputs }) => (
        e: React.ChangeEvent<HTMLInputElement>
      ) => ({
        inputs: {
          ...inputs,
          [e.target.name]: e.target.value
        }
      })
    }
  )
)(ResetPasswordForm);
