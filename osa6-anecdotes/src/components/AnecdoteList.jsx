import React from "react";
import { connect } from "react-redux";

import { voteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = props => {
  const handleVote = anecdote => () => {
    props.voteAnecdote(anecdote);
    props.showNotification("you voted anecdote: " + anecdote.content);
    setTimeout(() => {
      props.showNotification("");
    }, 5000);
  };

  return (
    <>
      {props.anecdotes.map(anecdote => (
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

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes
    .filter(a => a.content.toLowerCase().startsWith(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes);
};

const mapStateToProps = state => {
  return {
    anecdotes: anecdotesToShow(state),
    filter: state.filter
  };
};

const ConnectedAnecdoteList = connect(mapStateToProps, {
  voteAnecdote,
  showNotification
})(AnecdoteList);
export default ConnectedAnecdoteList;
