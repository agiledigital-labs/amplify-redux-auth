import { Hub } from 'aws-amplify';
import { HubCapsule } from '@aws-amplify/core/lib/Hub';
import { AuthState, State } from '../../state/types';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchCurrentUser, setAuthError, cleanAuthState } from '../../state';
import Auth from '../Auth';

interface AmplifyReduxAuthProps extends AmplifyReduxAuthOuterProps {
  readonly authCurrentUser: () => void;
  readonly cleanAuthState: () => void;
  readonly setAuthError: (message?: string) => void;
  readonly authState: AuthState;
  readonly children: JSX.Element;
}

interface AmplifyReduxAuthOuterProps {
  readonly AuthComponent?: JSX.Element;
  readonly logoText?: string;
}

const mapStateToProps = (state: State) => ({
  authState: state.authState
});

const mapDispatchProps = (dispatch: Dispatch) => ({
  authCurrentUser: bindActionCreators(fetchCurrentUser, dispatch),
  setAuthError: bindActionCreators(setAuthError, dispatch),
  cleanAuthState: bindActionCreators(cleanAuthState, dispatch)
});

const NotAuth = (logoText?: string, AuthComponent?: JSX.Element) =>
  AuthComponent ? AuthComponent : <Auth logoText={logoText || 'Login'} />;

const AmplifyReduxAuth = ({
  authState,
  AuthComponent,
  children,
  logoText
}: AmplifyReduxAuthProps) => (
  <>
    {authState.loggedIn || authState.checkingAuth
      ? children
      : NotAuth(logoText, AuthComponent)}
  </>
);

export default compose<AmplifyReduxAuthProps, AmplifyReduxAuthOuterProps>(
  connect(
    mapStateToProps,
    mapDispatchProps
  ),
  lifecycle<AmplifyReduxAuthProps, {}>({
    componentDidMount() {
      // Check if currently logged in by touching current user.
      this.props.authCurrentUser();

      /**
       * Hub capsule is a message bus used by AWS amplify.
       * The hub is used here to listen to the authentication events from Amplify.
       * @see https://aws-amplify.github.io/docs/js/hub
       */
      Hub.listen('auth', (capsule: HubCapsule) => {
        switch (capsule.payload.event) {
          case 'signIn':
            this.props.authCurrentUser();
            break;
          case 'signOut':
            this.props.cleanAuthState();
            break;
          case 'signIn_failure':
            break;
          case 'configured':
            this.props.authCurrentUser();
            break;
          default:
            console.warn(`Unexpected auth event [${capsule.payload.event}].`);
        }
      });
    }
  })
)(AmplifyReduxAuth);
