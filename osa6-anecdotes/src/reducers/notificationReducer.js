const initialState = "default notification";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data.text;
    default:
      return state;
  }
};

export const showNotification = text => {
  return {
    type: "SET_NOTIFICATION",
    data: { text }
  };
};

export default reducer;
