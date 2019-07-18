# amplify-redux-auth

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Note: AWS Amplify Rollup bundling [issue](https://github.com/aws/aws-sdk-js/issues/1769), has to make it as peer dependencies.

* Wraps the Amplify Authentication with Redux.
* Uses Redux for state management, suitable if your application is using Amplify, Redux and react-redux, makes it easy to plugin the authentication state into your own global state.
* Redux Actions exposed for you to manipulate the auth state freely.
* BYO authentication component, you can choose your own authentication component or use the default.

### Usage
`npm install --save amplify-redux-auth`

```
import AmplifyReduxAuth, { logout, State, UserData } from 'amplify-redux-auth';

const App = ({ logout, user, loggedIn }) => (
  <AmplifyReduxAuth logoText={'My Logo'}>
    {loggedIn && user ? (
      <div>
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
  connect(mapStateToProps, mapDispatchToProps)
)(App);
```
To use custom authentication component (see example folder).
```
<AmplifyReduxAuth AuthComponent={<YourCustomAuth />>
  ...    
</AmplifyReduxAuth>
```

### TODO
* Remove bunch of DRY code.
* Tests!
* Sign up feature with default Sign up form.
* Custom auth flow, e.g. OAuth, SAML.
* Code clean up.

