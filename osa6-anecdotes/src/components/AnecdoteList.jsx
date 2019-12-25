import React from "react";

import { voteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdotes;
  const filter = store.getState().filter;

  const handleVote = anecdote => () => {
    store.dispatch(voteAnecdote(anecdote.id));
    store.dispatch(showNotification("you voted anecdote: " + anecdote.content));
    setTimeout(() => {
      store.dispatch(showNotification(""));
    }, 5000);
  };

  return (
    <>
      {anecdotes
        .filter(a => a.content.toLowerCase().startsWith(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes} votes
              <button onClick={handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
