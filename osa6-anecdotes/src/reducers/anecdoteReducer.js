export const getId = () => (100000 * Math.random()).toFixed(0);

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      const anecdoteToChange = state.find(a => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );

    case "ADD_NEW":
      return state.concat(action.data);

    case "INIT_ANECDOTES":
      return action.data;

    default:
      return state;
  }
};

export const voteAnecdote = id => {
  return {
    type: "VOTE",
    data: { id }
  };
};

export const addAnecdote = data => {
  return {
    type: "ADD_NEW",
    data
  };
};

export const initializeAnecdotes = notes => {
  return {
    type: "INIT_ANECDOTES",
    data: notes
  };
};

export default reducer;
