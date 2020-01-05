const initialState = "";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data.text;
    case "CLEAR_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

export const showNotification = (text, time) => {
  return async dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: { text }
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION"
      });
    }, time * 1000);
  };
};

export default reducer;
