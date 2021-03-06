import anecdoteService from "../services/anecdotes";

export const getId = () => (100000 * Math.random()).toFixed(0);

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data;
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

export const voteAnecdote = anecdote => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(anecdote);
    dispatch({
      type: "VOTE",
      data: anecdote.id
    });
  };
};

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "ADD_NEW",
      data: newAnecdote
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    });
  };
};

export default reducer;
