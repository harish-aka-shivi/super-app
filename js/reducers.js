import { combineReducers } from 'redux';
import appReducer from './containers/App/ducks';

const createReducer = () => {
  const rootReducer = combineReducers({
    app: appReducer,
  });
  return rootReducer;
};

export default createReducer;
