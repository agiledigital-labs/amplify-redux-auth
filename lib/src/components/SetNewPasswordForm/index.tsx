import React from 'react';
import { connect } from 'react-redux';
import { compose, withStateHandlers } from 'recompose';
import { CardActions, Button, TextField, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import authStyles from '../Auth/styles';
import { State, setNewPassword } from '../../state';
import { bindActionCreators, Dispatch } from 'redux';
import { ClassNameMap } from '@material-ui/styles/withStyles';
import ErrorMessage from '../ErrorMessage';

interface SetNewPasswordFormProps {
  readonly error?: string;
  readonly classes: ClassNameMap;
  readonly inputs: { readonly username: string; readonly password: string };
  readonly setNewPassword: (password: string) => void;
  readonly handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SetNewPasswordForm = ({
  classes,
  setNewPassword,
  handleInputChange,
  inputs,
  error
}: SetNewPasswordFormProps) => (
  <div className={classes.main}>
    <Card className={classes.card}>
      <div className={classes.title}>
        <h2>Set New Password</h2>
      </div>
      <ErrorMessage errorMessage={error} />
      <form
        className={classes.form}
        onSubmit={e => {
          e.preventDefault();
          setNewPassword(inputs.password);
        }}>
        <div className={classes.form}>
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
              Change
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
  setNewPassword: bindActionCreators(setNewPassword, dispatch)
});

export default compose<SetNewPasswordFormProps, {}>(
  withStyles(authStyles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStateHandlers(
    {
      inputs: {
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
)(SetNewPasswordForm);
