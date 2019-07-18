import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { rootSaga } from './state/saga';
import App from './App';
import createStore from './state/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { configureAmplify } from 'amplify-redux-auth';

// Create the app's Redux store, which manages all of its state.
const store = createStore();

rootSaga.run();

const rootComponent = () => (
  <React.Fragment>
    <Provider store={store}>
      <App />
    </Provider>
  </React.Fragment>
);

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
