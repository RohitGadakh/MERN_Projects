import { createStore, combineReducers, applyMiddleware } from 'redux';
//import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducer';

const finalReducer = combineReducers({
  rootReducer
});

const initialState = {
  rootReducer: {
    cartItems: localStorage.getItem("cartItems") 
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  }
};

const middleware = [];
const store = createStore(
  finalReducer, // Use finalReducer instead of rootReducer
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;





