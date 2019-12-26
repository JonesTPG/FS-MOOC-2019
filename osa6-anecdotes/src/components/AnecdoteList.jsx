import React from "react";
import { connect } from "react-redux";

import { voteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = props => {
  const handleVote = anecdote => () => {
    props.voteAnecdote(anecdote.id);
    props.showNotification("you voted anecdote: " + anecdote.content);
    setTimeout(() => {
      props.showNotification("");
    }, 5000);
  };

  return (
    <>
      {props.anecdotes
        .filter(a =>
          a.content.toLowerCase().startsWith(props.filter.toLowerCase())
        )
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
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    voteAnecdote: value => {
      dispatch(voteAnecdote(value));
    },
    showNotification: value => {
      dispatch(showNotification(value));
    }
  };
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdoteList;
