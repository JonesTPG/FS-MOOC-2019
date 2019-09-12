import React from "react";
import { useState, useEffect } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import Error from "./components/error";
import Notification from "./components/notification";
import Togglable from "./components/togglable";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
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
    setNotificationMessage(
      "a new blog " + newBlog.title + " by " + newBlog.author + " added."
    );
    setTimeout(() => {
      setNotificationMessage(null);
    }, 4000);
  };

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");

      setNotificationMessage("logged in successfully");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 4000);
    } catch (e) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.clear();
    setUser(null);
    setNotificationMessage("logged out successfully");
    setTimeout(() => {
      setNotificationMessage(null);
    }, 4000);
  };

  const loginForm = () => (
    <>
      <Error message={errorMessage} />
      <Notification message={notificationMessage}></Notification>

      <p>login to the application</p>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );

  const blogsList = () => (
    <>
      <Notification message={notificationMessage}></Notification>
      <p>{user.username} has logged in.</p>
      <button onClick={handleLogOut}>log out</button>

      <Togglable buttonLabel="new blog">
        <CreateBlog update={addBlog} />
      </Togglable>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );

  return <>{user === null ? loginForm() : blogsList()}</>;
};

export default App;
