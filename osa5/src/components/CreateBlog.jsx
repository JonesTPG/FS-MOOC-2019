import React from "react";
import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const CreateBlog = ({ update }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async event => {
    event.preventDefault();

    let newBlog = {
      title: title,
      author: author,
      url: url
    };

    await blogService.create(newBlog);
    update(newBlog);
  };

  return (
    <>
      <h3>create new</h3>

      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <br></br>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <br></br>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
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
