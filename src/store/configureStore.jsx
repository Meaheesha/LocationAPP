import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "../reducers";

const configureStore = () => {
  
  const middleWare = [thunk];
  const enhancers = composeWithDevTools(applyMiddleware(...middleWare));
  
  return createStore(reducers, {}, enhancers);
}

export default configureStore;
