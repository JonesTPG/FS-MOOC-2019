import React from "react";

const Anecdote = props => {
  console.log(props);
  return (
    <div>
      <h2>{props.anecdote.content}</h2>
      <p>has {props.anecdote.votes} votes</p>
      <p>
        {" "}
        For more info see{" "}
        <a href={props.anecdote.info}>{props.anecdote.info}</a>
      </p>
    </div>
  );
};

export default Anecdote;
