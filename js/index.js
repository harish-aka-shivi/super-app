import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './createStore';

if (__DEV__) {
  import('./reactotronConfig').then(() => console.log('Reactotron Configured'));
}

const store = configureStore();

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RootApp;
