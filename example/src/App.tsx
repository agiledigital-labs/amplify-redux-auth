import React from 'react';
import AmplifyReduxAuth, {
  logout,
  State,
  UserData
} from 'amplify-redux-auth';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { isNil } from 'lodash/fp';
import { Dispatch, bindActionCreators } from 'redux';
import CustomAuth from './components/CustomAuth';

interface AppProps {
  logout: () => void;
  loggedIn: boolean;
  user: UserData;
}

const App = ({ logout, user, loggedIn }) => (
  <AmplifyReduxAuth logoText={'Example'} AuthComponent={<CustomAuth />}>
    {loggedIn && !isNil(user) ? (
      <div style={{ marginTop: '100px', textAlign: 'center' }}>
        You've logged in!
        <div>{user.username}</div>
        <div>{user.attributes['email']}</div>
        <div style={{ marginTop: '20px' }}>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    ) : (
      <></>
    )}
  </AmplifyReduxAuth>
);

const mapStateToProps = (state: State) => ({
  user: state.authState.currentUser,
  loggedIn: state.authState.loggedIn
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: bindActionCreators(logout, dispatch)
});

export default compose<AppProps, {}>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(App);
