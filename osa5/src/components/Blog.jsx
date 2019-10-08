import React from "react";
import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, update, loggedInUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleClick = async () => {
    const updatedBlog = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: likes + 1,
      id: blog.id
    };

    await blogService.update(updatedBlog);
    setLikes(likes + 1);
  };

  const handleClick2 = async () => {
    let confirmed = window.confirm("Delete " + blog.title + "?");

    if (confirmed === true) {
      await blogService.remove(blog.id);
      update();
    }
  };

  return (
    <div style={blogStyle} className="single-blog">
      <div className="toggle" onClick={() => toggleDetails()}>
        {blog.title} {blog.author}
      </div>
      {showDetails ? (
        <div>
          <p>{blog.url}</p>
          <p>{likes}</p>
          <button onClick={handleClick}>like</button>
          <p>added by {blog.user.name}</p>

          <p> user id: {blog.user.id}</p>
          <p> logged in user id: {loggedInUser}</p>
          {blog.user.id === loggedInUser ? (
            <button onClick={handleClick2}>remove</button>
          ) : (
            <p>you dont own this blog.</p>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Blog;
