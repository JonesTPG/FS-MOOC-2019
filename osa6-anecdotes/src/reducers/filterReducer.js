const initialState = "";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.data.text;
    default:
      return state;
  }
};

export const setFilter = text => {
  return {
    type: "SET_FILTER",
    data: { text }
  };
};

export default reducer;
