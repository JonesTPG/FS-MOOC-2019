import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Users = props => {
  let users = props.users;

  return (
    <>
      <h3> users </h3>
      <table data-cy="users-table">
        <thead>
          <tr>
            <th>username</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={"/users/" + user.id}> {user.username} </Link>
              </td>
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

const ConnectedUsers = connect(mapStateToProps)(Users);
export default ConnectedUsers;
