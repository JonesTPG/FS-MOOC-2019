import React from "react";
import { connect } from "react-redux";

import { getUsers } from "../reducers/userReducer";

const User = props => {
  let user = props.user;
  if (user === null || user === undefined) {
    return <p> loading </p>;
  }

  return (
    <>
      <h3 data-cy="user-info-username">{user.username}</h3>
      <strong> added blogs </strong>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

const getUserById = (users, id) => {
  return users.find(user => user.id === id);
};

const mapStateToProps = (state, props) => {
  return {
    user: getUserById(state.users, props.id)
  };
};

const ConnectedUser = connect(mapStateToProps, { getUsers })(User);
export default ConnectedUser;
