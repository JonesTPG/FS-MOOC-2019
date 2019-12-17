import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import About from "./components/about";
import Anecdote from "./components/anecdote";
import CreateAnecdote from "./components/createnew";
import Footer from "./components/footer";
import AnecdoteList from "./components/anectodelist";
import Menu from "./components/menu";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1"
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2"
    }
  ]);

  const [notification, setNotification] = useState("");

  const addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = id => anecdotes.find(a => a.id === id);

  const vote = id => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>

      <Router>
        <Menu />
        <Route
          exact
          path="/"
          render={() => <AnecdoteList anecdotes={anecdotes} />}
        />
        <Route
          exact
          path="/create"
          render={() => <CreateAnecdote addNew={addNew} />}
        />
        <Route exact path="/about" render={() => <About />} />
        <Route
          path="/anecdotes/:id"
          render={({ match }) => (
            <Anecdote anecdote={anecdoteById(match.params.id)} />
          )}
        />
      </Router>
      <Footer />
    </div>
  );
};

export default App;
