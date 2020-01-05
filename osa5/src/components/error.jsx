import React from "react";
import { connect } from "react-redux";

const style = {
  color: "red",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
};

const Error = props => {
  if (props.error === null || props.error === "") {
    return null;
  }

  return <div style={style}>{props.error}</div>;
};

const mapStateToProps = state => {
  return {
    error: state.error
  };
};

const ConnectedError = connect(mapStateToProps)(Error);
export default ConnectedError;
