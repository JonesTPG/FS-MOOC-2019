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
    const newNote = await anecdoteService.createNew(content);
    props.addAnecdote(newNote);
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

const mapDispatchToProps = dispatch => {
  return {
    addAnecdote: value => {
      dispatch(addAnecdote(value));
    },
    showNotification: value => {
      dispatch(showNotification(value));
    }
  };
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;
