import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = props => {
  const [selected, setSelected] = useState(0);
  const [mostVoted, setMostVoted] = useState(0);
  const [scores, setScores] = useState([0, 0, 0, 0, 0, 0]);

  const calculateMostVoted = scores => {
    let index = 0;
    let max = 0;
    for (let i = 0; i < scores.length; i++) {
      if (scores[i] > max) {
        max = scores[i];
        index = i;
      }
    }
    setMostVoted(index);
  };

  const getRandNumber = () => {
    setSelected(Math.floor(Math.random() * 6));
  };

  const voteAnecdote = selected => () => {
    const scoresCopy = [...scores];
    scoresCopy[selected] = scoresCopy[selected] + 1;
    setScores(scoresCopy);
    calculateMostVoted(scoresCopy);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <p>has {scores[selected]} votes</p>
      <button onClick={getRandNumber}>next anecdote</button>
      <button onClick={voteAnecdote(selected)}>vote</button>
      <br />
      <h1>Anecdote with most votes</h1>
      <div>{props.anecdotes[mostVoted]}</div>
      <p>has {scores[mostVoted]} votes</p>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
