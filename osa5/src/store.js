import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import errorReducer from "./reducers/errorReducer";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  error: errorReducer,
  user: loginReducer,
  users: userReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
