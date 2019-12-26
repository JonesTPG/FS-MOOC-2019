import React, { useEffect } from "react";
import { connect } from "react-redux";

import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

import anecdoteService from "./services/anecdotes";

import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = props => {
  useEffect(() => {
    anecdoteService
      .getAll()
      .then(anecdotes => props.initializeAnecdotes(anecdotes));
  }, [props]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    initializeAnecdotes: value => {
      dispatch(initializeAnecdotes(value));
    }
  };
};

export default connect(null, mapDispatchToProps)(App);
