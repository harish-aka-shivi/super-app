import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './createStore';

const store = configureStore();

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RootApp;
