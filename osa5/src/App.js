import React from "react";
import { useState, useEffect } from "react";
import { useField } from "./hooks";
import { connect } from "react-redux";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import Error from "./components/error";
import Notification from "./components/notification";
import Togglable from "./components/togglable";

import { showNotification } from "./reducers/notificationReducer";
import { showError } from "./reducers/errorReducer";

const App = props => {
  const username = useField("text");
  const password = useField("password");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = newBlog => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs);
      console.log(initialBlogs);
    });
    props.showNotification(
      "a new blog " + newBlog.title + " by " + newBlog.author + " added.",
      4
    );
  };

  const removeBlog = () => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs);
      console.log(initialBlogs);
    });
    props.showNotification("blog deleted.", 4);
  };

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      username.clear();
      password.clear();
      console.log("user" + user.token);
      blogService.setToken(user.token);

      props.showNotification("logged in succesfully", 4);
    } catch (e) {
      username.clear();
      password.clear();
      props.showError("wrong credentials", 4);
    }
  };

  const handleLogOut = () => {
    window.localStorage.clear();
    setUser(null);
    props.showNotification("logged out successfully", 4);
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
      <p>{user.username} has logged in.</p>
      <button onClick={handleLogOut}>log out</button>

      <Togglable buttonLabel="new blog">
        <CreateBlog update={addBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            update={removeBlog}
            loggedInUser={user.id}
          />
        ))}
    </div>
  );

  return <>{user === null ? loginForm() : blogsList()}</>;
};

const ConnectedApp = connect(null, { showNotification, showError })(App);
export default ConnectedApp;
