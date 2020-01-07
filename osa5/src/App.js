import React from "react";
import { useEffect } from "react";
import { useField } from "./hooks";
import { connect } from "react-redux";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import Error from "./components/error";
import Notification from "./components/notification";
import Togglable from "./components/togglable";

import { showNotification } from "./reducers/notificationReducer";
import { showError } from "./reducers/errorReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { logIn, logOut } from "./reducers/userReducer";

const App = props => {
  const username = useField("text");
  const password = useField("password");

  let initializeBlogs = props.initializeBlogs;
  let token = props.user.token;

  useEffect(() => {
    initializeBlogs();
    blogService.setToken(token);
  }, [initializeBlogs, token]);

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
          <input {...username.inputFieldProps()} />
        </div>
        <div>
          password
          <input {...password.inputFieldProps()} />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );

  const blogsList = () => (
    <div className="blog-list">
      <Notification></Notification>
      <p>{props.user.username} has logged in.</p>
      <button onClick={handleLogOut}>log out</button>

      <Togglable buttonLabel="new blog">
        <CreateBlog />
      </Togglable>
      {props.blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog} loggedInUser={props.user.id} />
        ))}
    </div>
  );

  return <>{token == null ? loginForm() : blogsList()}</>;
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
  logIn,
  logOut
})(App);
export default ConnectedApp;
