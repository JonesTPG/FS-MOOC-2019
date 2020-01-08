import React from "react";
import { useEffect } from "react";
import { useField } from "./hooks";
import { connect } from "react-redux";

import { BrowserRouter as Router, Route } from "react-router-dom";

import blogService from "./services/blogs";
import BlogListItem from "./components/BlogListItem";
import CreateBlog from "./components/CreateBlog";
import Menu from "./components/Menu";
import Users from "./components/Users";
import Error from "./components/error";
import Notification from "./components/notification";
import Togglable from "./components/togglable";
import User from "./components/User";

import { showNotification } from "./reducers/notificationReducer";
import { showError } from "./reducers/errorReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { logIn, logOut } from "./reducers/loginReducer";
import { getUsers } from "./reducers/userReducer";
import SingleBlog from "./components/SingleBlog";

const App = props => {
  const username = useField("text");
  const password = useField("password");

  let initializeBlogs = props.initializeBlogs;
  let initializeUsers = props.getUsers;
  let token = props.user.token;

  useEffect(() => {
    initializeBlogs();
    initializeUsers();
    blogService.setToken(token);
  }, [initializeBlogs, initializeUsers, token]);

  const handleLogin = async event => {
    event.preventDefault();

    try {
      props.logIn({
        username: username.value,
        password: password.value
      });

      username.clear();
      password.clear();

      props.showNotification("logged in succesfully", 4);
    } catch (e) {
      username.clear();
      password.clear();
      props.showError("wrong credentials", 4);
    }
  };

  const handleLogOut = () => {
    props.logOut();
    props.showNotification("logged out successfully", 4);
    blogService.setToken(null);
  };

  const loginForm = () => (
    <>
      <Error />
      <Notification></Notification>

      <p>login to the application</p>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input data-cy="username" {...username.inputFieldProps()} />
        </div>
        <div>
          password
          <input data-cy="password" {...password.inputFieldProps()} />
        </div>
        <button data-cy="login" type="submit">
          login
        </button>
      </form>
    </>
  );

  const blogsList = () => (
    <Router>
      <Menu />
      <div className="blog-list">
        <Notification></Notification>
        <p>{props.user.username} has logged in.</p>
        <button data-cy="log-out" onClick={handleLogOut}>
          log out
        </button>

        <Togglable buttonLabel="new blog">
          <CreateBlog />
        </Togglable>
        {props.blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <BlogListItem
              key={blog.id}
              blog={blog}
              loggedInUser={props.user.id}
            />
          ))}
      </div>

      <Route exact path="/users" render={() => <Users />}></Route>
      <Route
        exact
        path="/users/:id"
        render={({ match }) => <User id={match.params.id} />}
      />
      <Route
        exact
        path="/blogs/:id"
        render={({ match }) => (
          <SingleBlog loggedInUser={props.user.id} id={match.params.id} />
        )}
      />
    </Router>
  );

  return (
    <>
      <h2>BLOGLIST APPLICATION</h2>
      {token === null || token === undefined ? loginForm() : blogsList()}
    </>
  );
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user
  };
};

const ConnectedApp = connect(mapStateToProps, {
  showNotification,
  showError,
  initializeBlogs,
  getUsers,
  logIn,
  logOut
})(App);
export default ConnectedApp;
