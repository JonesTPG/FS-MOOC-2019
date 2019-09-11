import React from "react";

const style = {
  color: "red",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
};

const Error = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div style={style}>{message}</div>;
};

export default Error;
