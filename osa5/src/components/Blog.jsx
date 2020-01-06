import React from "react";
import { useState } from "react";
import { connect } from "react-redux";

import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";

const Blog = props => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  let blog = props.blog;
  let loggedInUser = props.loggedInUser;

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleLike = async () => {
    props.likeBlog(blog.id);
  };

  const handleRemove = async () => {
    let confirmed = window.confirm("Delete " + blog.title + "?");

    if (confirmed === true) {
      props.deleteBlog(blog.id);
      props.showNotification("blog deleted.", 4);
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
          <p>{blog.likes}</p>
          <button onClick={handleLike}>like</button>
          <p>added by {blog.user.name}</p>

          <p> user id: {blog.user.id}</p>
          <p> logged in user id: {loggedInUser}</p>
          {blog.user.id === loggedInUser ? (
            <button onClick={handleRemove}>remove</button>
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

const ConnectedBlog = connect(null, {
  deleteBlog,
  likeBlog,
  showNotification
})(Blog);
export default ConnectedBlog;
