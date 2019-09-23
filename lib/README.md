# amplify-redux-auth

[![CircleCI](https://circleci.com/gh/agiledigital/amplify-redux-auth.svg?style=svg)](https://circleci.com/gh/agiledigital/amplify-redux-auth)

[![npm version](https://badge.fury.io/js/amplify-redux-auth.svg?killcache=5)](https://badge.fury.io/js/amplify-redux-auth) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


* Wraps the Amplify Authentication with Redux.
* Uses Redux for state management, suitable if your application is using Amplify, Redux and react-redux, makes it easy to plugin the authentication state into your own global state.
* Redux Actions exposed for you to manipulate the auth state freely.
* BYO authentication component, you can choose your own authentication component or use the default.

### Usage
`yarn add aws-amplify amplify-redux-auth react react-dom react-redux @material-ui/core`

Or

`npm install --save aws-amplify amplify-redux-auth react react-dom react-redux @material-ui/core`

Note: `@material-ui/core` is used by the library and required as Peer Dependencies (to avoid that if `@material-ui/core` is used in your application, it will have conflict), this may be changed in the future (remove it as peer dependency).

Note: AWS Amplify Rollup bundling [issue](https://github.com/aws/aws-sdk-js/issues/1769), has to make it as peer dependencies.

### Configure AWS Amplify from you application
```javascript
import { configureAmplify } from 'amplify-redux-auth';

// You can supply AWS Amplify config in you index.ts or index.js just before ReactDOM.render.
// See https://aws-amplify.github.io/docs/js/authentication#manual-setup
const awsAmplifyConfig = {
  Auth: {
    region: process.env.REACT_APP_AWS_REGION,
    identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_ID,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_WEB_CLIENT_ID
  }
};

configureAmplify(awsAmplifyConfig);

ReactDOM.render(rootComponent(), document.getElementById('root'));
```


### Hook up the state/sagas to your Redux store
```javascript
// reducers.ts
import { combineReducers } from 'redux';
import { authState } from 'amplify-redux-auth';

export const rootReducer = combineReducers({
  authState,
  ... // your other reducers
});

// sagas.ts
import { sagaMiddleware } from './store';
import { authSagas } from 'amplify-redux-auth';

export const rootSaga = {
  run: () => sagaMiddleware.run(authSagas),
  .... // your other sagas
};

```

#### Wrap it with your component
```javascript
import ....
import AmplifyReduxAuth, { logout, State, UserData } from 'amplify-redux-auth';

const App = ({ logout, user, loggedIn }) => (
  <AmplifyReduxAuth logoText={'My Logo'}>
    <div>
      {'You\'ve logged in!'}
    </div>
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

#### Custom authentication component (see [../example](https://github.com/agiledigital/amplify-redux-auth/tree/master/example) folder).
```javascript
<AmplifyReduxAuth AuthComponent={<YourCustomAuth />>
  ...
</AmplifyReduxAuth>
```

:shipit: :shipit: :shipit:

### TODO
* Remove bunch of DRY code.
* Tests! :see_no_evil:
* Sign up feature with default Sign up form.
* Custom auth flow, e.g. OAuth, SAML.
* Improve the auth state, or make it more flexible.
* Remove `@material-ui` as peer dependency.

