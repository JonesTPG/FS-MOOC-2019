import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";
import { Button } from "semantic-ui-react";

const SingleBlog = props => {
  let blog = props.blog;

  const handleLike = () => {
    props.likeBlog(blog.id);
  };

  const handleRemove = async () => {
    let confirmed = window.confirm("Delete " + blog.title + "?");

    if (confirmed === true) {
      props.deleteBlog(blog.id);
      props.showNotification("blog deleted.", 4);
      props.history.push("/");
    }
  };

  if (blog === null || blog === undefined) {
    return <p>loading</p>;
  }

  return (
    <>
      <h3>{blog.title}</h3> by <h3>{blog.author}</h3>
      <p>url: {blog.url}</p>
      <p>likes: {blog.likes}</p>
      <Button onClick={handleLike}>like</Button>
      <p>added by {blog.user.username}</p>
      {blog.user.id === props.loggedInUser ? (
        <Button onClick={handleRemove}>remove</Button>
      ) : (
        <p>you dont own this blog.</p>
      )}
    </>
  );
};

const getBlogById = (blogs, id) => {
  return blogs.find(blog => blog.id === id);
};

const mapStateToProps = (state, props) => {
  return {
    blog: getBlogById(state.blogs, props.id)
  };
};

const ConnectedSingleBlog = connect(mapStateToProps, {
  deleteBlog,
  likeBlog,
  showNotification
})(SingleBlog);
export default withRouter(ConnectedSingleBlog);
