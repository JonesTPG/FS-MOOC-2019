import React from "react";
import { useField } from "../hooks/index";
import { connect } from "react-redux";

import { addBlog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";

const CreateBlog = props => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const handleCreate = async event => {
    event.preventDefault();

    let newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    };

    props.addBlog(newBlog);
    title.clear();
    author.clear();
    url.clear();
  };

  return (
    <>
      <h3>create new</h3>

      <form onSubmit={handleCreate}>
        <div>
          title:
          <input {...title.inputFieldProps()} />
        </div>
        <br></br>
        <div>
          author:
          <input {...author.inputFieldProps()} />
        </div>
        <br></br>
        <div>
          url:
          <input {...url.inputFieldProps()} />
        </div>
        <br></br>
        <button type="submit">create</button>
        <br></br>
      </form>
    </>
  );
};

const ConnectedCreateBlog = connect(null, {
  addBlog
})(CreateBlog, showNotification);
export default ConnectedCreateBlog;
