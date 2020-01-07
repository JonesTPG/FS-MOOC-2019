import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";

const BlogListItem = props => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  let blog = props.blog;

  return (
    <div style={blogStyle} className="single-blog">
      <div className="toggle">
        <Link to={"/blogs/" + blog.id}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  );
};

const ConnectedBlog = connect(null, {
  deleteBlog,
  likeBlog,
  showNotification
})(BlogListItem);
export default ConnectedBlog;
