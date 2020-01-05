import React from "react";
import { connect } from "react-redux";

const style = {
  color: "green",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
};

const Notification = props => {
  if (props.notification === null || props.notification === "") {
    return null;
  }

  return <div style={style}>{props.notification}</div>;
};

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
