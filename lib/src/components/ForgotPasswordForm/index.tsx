import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Card, CardActions, Button, TextField } from '@material-ui/core';
import { bindActionCreators, Dispatch } from 'redux';
import {
  setAuthStatus,
  forgotPassword,
  State,
  AmplifyAuthStatus
} from '../../state';
import withStyles, { ClassNameMap } from '@material-ui/styles/withStyles';
import authStyles from '../Auth/styles';
import ErrorMessage from '../ErrorMessage';

interface ForgotPasswordFormProps {
  readonly error?: string;
  readonly classes: ClassNameMap;
  readonly inputs: { readonly username: string };
  readonly forgotPassword: (username: string) => void;
  readonly setAuthStatus: (status: AmplifyAuthStatus) => void;
  readonly handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const mapStateToProps = (state: State) => ({
  error: state.authState.error
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAuthStatus: bindActionCreators(setAuthStatus, dispatch),
  forgotPassword: bindActionCreators(forgotPassword, dispatch)
});

const ForgotPasswordForm = ({
  classes,
  forgotPassword,
  error,
  inputs,
  handleInputChange,
  setAuthStatus
}: ForgotPasswordFormProps) => (
  <div className={classes.main}>
    <Card className={classes.card}>
      <div className={classes.title}>
        <h2>Request password reset</h2>
      </div>
      <ErrorMessage errorMessage={error} />
      <form
        className={classes.form}
        onSubmit={e => {
          e.preventDefault();
          forgotPassword(inputs.username);
        }}>
        <div className={classes.form}>
          <div className={classes.input}>
            <TextField
              required
              id="username"
              name="username"
              label="Username"
              fullWidth
              onChange={handleInputChange}
            />
          </div>
          <CardActions>
            <Button variant="outlined" color="primary" type="submit" fullWidth>
              Confirm
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

export default compose<ForgotPasswordFormProps, {}>(
  withStyles(authStyles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStateHandlers(
    {
      inputs: {
        username: ''
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
)(ForgotPasswordForm);
