import { createStore, applyMiddleware, compose } from 'redux';
import createReducer from './reducers';

const configureStore = () => {
  const middlewares = [];
  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    createReducer(),
    compose(...enhancers),
  );

  return store;
};

export default configureStore;
