import React from "react";
import { useField } from "../hooks/index";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const CreateBlog = ({ update }) => {
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

    await blogService.create(newBlog);
    update(newBlog);
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

CreateBlog.propTypes = {
  update: PropTypes.func.isRequired
};

export default CreateBlog;
