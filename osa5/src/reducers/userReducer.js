/* eslint-disable indent */
import loginService from "../services/login";

let user = JSON.parse(localStorage.getItem("loggedBlogAppUser"));
const initialState = user ? user : {};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.data;
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};

export const logIn = credentials => {
  return async dispatch => {
    const user = await loginService.login(credentials);

    window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
    dispatch({
      type: "LOGIN",
      data: user
    });
  };
};

export const logOut = () => {
  return async dispatch => {
    window.localStorage.clear();
    dispatch({
      type: "LOGOUT"
    });
  };
};

export default reducer;
