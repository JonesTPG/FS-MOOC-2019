import React from "react";

import { addAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({ store }) => {
  const addNote = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    store.dispatch(addAnecdote(content));

    store.dispatch(showNotification("you added anecdote: " + content));
    setTimeout(() => {
      store.dispatch(showNotification(""));
    }, 5000);
    event.target.anecdote.value = "";
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

export default AnecdoteForm;
