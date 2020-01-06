/* eslint-disable indent */
const initialState = "";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return action.data.text;
    case "CLEAR_ERROR":
      return "";
    default:
      return state;
  }
};

export const showError = (text, time) => {
  return async dispatch => {
    dispatch({
      type: "SET_ERROR",
      data: { text }
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR_ERROR"
      });
    }, time * 1000);
  };
};

export default reducer;
