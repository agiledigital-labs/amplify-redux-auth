import { sagaMiddleware } from './store';
import { authSagas } from 'amplify-redux-auth';

export const rootSaga = {
  run: () => sagaMiddleware.run(authSagas)
};
