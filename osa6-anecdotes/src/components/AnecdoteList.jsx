import React from "react";
import { connect } from "react-redux";

import { voteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = ({ store, anecdotes, filter }) => {
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

const mapStateToProps = state => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  console.log(state);
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  };
};

const ConnectedAnecdoteList = connect(mapStateToProps)(AnecdoteList);
export default ConnectedAnecdoteList;
