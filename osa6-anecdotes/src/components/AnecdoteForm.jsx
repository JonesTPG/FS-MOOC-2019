import React from "react";
import { connect } from "react-redux";

import { addAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

import anecdoteService from "../services/anecdotes";

const AnecdoteForm = props => {
  const addNote = async event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.addAnecdote(content);
    props.showNotification("you added anecdote: " + content);
    setTimeout(() => {
      props.showNotification("");
    }, 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

const ConnectedAnecdoteForm = connect(null, { addAnecdote, showNotification })(
  AnecdoteForm
);
export default ConnectedAnecdoteForm;
