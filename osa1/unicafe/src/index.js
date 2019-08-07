import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => {
    setGood(good + 1);
  };

  const addNeutral = () => {
    setNeutral(neutral + 1);
  };

  const addBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header text="give feedback" />

      <Button handleClick={addGood} name="good" />
      <Button handleClick={addNeutral} name="neutral" />
      <Button handleClick={addBad} name="bad" />

      <Header text="statistics" />

      {good + neutral + bad > 0 ? (
        <>
          <Items good={good} neutral={neutral} bad={bad} />
        </>
      ) : (
        <p>No feedback given.</p>
      )}
    </div>
  );
};

const Header = ({ text }) => {
  return (
    <>
      <h2>{text}</h2>
    </>
  );
};

const Item = ({ name, amount }) => {
  return (
    <>
      <tr>
        <td> {name} </td> <td>{amount}</td>
      </tr>
    </>
  );
};

const Items = ({ good, neutral, bad }) => {
  const countAll = good + neutral + bad;
  const countAverage = (good - bad) / countAll;
  const countPositive = (good / countAll) * 100 + "%";

  return (
    <>
      <table>
        <tbody>
          <Item name="good" amount={good} />
          <Item name="neutral" amount={neutral} />
          <Item name="bad" amount={bad} />
          <Item name="all" amount={countAll} />
          <Item name="average" amount={countAverage} />
          <Item name="positive" amount={countPositive} />
        </tbody>
      </table>
    </>
  );
};

const Button = ({ handleClick, name }) => {
  return (
    <>
      <button onClick={handleClick}>{name}</button>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
