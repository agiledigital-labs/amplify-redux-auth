import React from 'react';
import { connect } from 'react-redux';
import { compose, withStateHandlers } from 'recompose';
import { CardActions, Button, TextField, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import authStyles from '../Auth/styles';
import { State, setAuthStatus, login, AmplifyAuthStatus } from '../../state';
import { bindActionCreators, Dispatch } from 'redux';
import { ClassNameMap } from '@material-ui/styles/withStyles';
import ErrorMessage from '../ErrorMessage';

interface LoginProps extends LoginOuterProps {
  readonly error?: string;
  readonly classes: ClassNameMap;
  readonly inputs: { readonly username: string; readonly password: string };
  readonly setAuthStatus: (status: AmplifyAuthStatus) => void;
  readonly login: (username: string, password: string) => void;
  readonly handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface LoginOuterProps {
  readonly logoText: string;
}

const LoginForm = ({
  classes,
  logoText,
  login,
  handleInputChange,
  inputs,
  setAuthStatus,
  error
}: LoginProps) => (
  <div className={classes.main}>
    <Card className={classes.card}>
      <div className={classes.title}>
        <h2>{logoText}</h2>
      </div>
      <ErrorMessage errorMessage={error} />
      <form
        className={classes.form}
        onSubmit={e => {
          e.preventDefault();
          login(inputs.username, inputs.password);
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
              id="password"
              name="password"
              label="Password"
              type="password"
              value={inputs.password}
              fullWidth
              onChange={handleInputChange}
            />
          </div>
          <CardActions>
            <Button
              variant="outlined"
              className={classes.button}
              type="submit"
              fullWidth>
              Login
            </Button>
          </CardActions>
          <CardActions>
            <Button
              fullWidth
              type="button"
              onClick={() => setAuthStatus(AmplifyAuthStatus.forgotPassword)}>
              Forgot your password?
            </Button>
          </CardActions>
        </div>
      </form>
    </Card>
  </div>
);

const mapStateToProps = (state: State) => ({
  error: state.authState.error
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAuthStatus: bindActionCreators(setAuthStatus, dispatch),
  login: bindActionCreators(login, dispatch)
});

export default compose<LoginProps, LoginOuterProps>(
  withStyles(authStyles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStateHandlers(
    {
      inputs: {
        username: '',
        password: ''
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
)(LoginForm);
