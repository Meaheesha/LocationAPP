import { combineReducers } from "redux";
import locationReducer from './LocationReducer';

const reducers = combineReducers({
  reducer: locationReducer
});

export default reducers;
