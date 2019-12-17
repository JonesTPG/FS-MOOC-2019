import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5
  };
  return (
    <div>
      <Link to="/">anecdotes</Link> {"   "}
      <Link to="/create">create new</Link>
      {"   "}
      <Link to="/about">about</Link>
    </div>
  );
};

export default Menu;
