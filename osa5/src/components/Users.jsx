import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getUsers } from "../reducers/userReducer";

const Users = props => {
  let users = props.users;
  let getUsers = props.getUsers;

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <h3> users </h3>
      <table>
        <thead>
          <tr>
            <th>username</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username} </td>
              <td> {user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const ConnectedUsers = connect(mapStateToProps, { getUsers })(Users);
export default ConnectedUsers;
