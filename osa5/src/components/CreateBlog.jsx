import React from "react";
import { useField } from "../hooks/index";
import { connect } from "react-redux";

import { addBlog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";
import { Form, Button } from "semantic-ui-react";

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

      <Form onSubmit={handleCreate}>
        <Form.Field>
          <label>title:</label>
          <input data-cy="blog-title" {...title.inputFieldProps()} />
        </Form.Field>

        <Form.Field>
          <label>author:</label>
          <input data-cy="blog-author" {...author.inputFieldProps()} />
        </Form.Field>

        <Form.Field>
          <label>url:</label>
          <input data-cy="blog-url" {...url.inputFieldProps()} />
        </Form.Field>

        <Button data-cy="post-blog" type="submit">
          create
        </Button>
      </Form>
    </>
  );
};

const ConnectedCreateBlog = connect(null, {
  addBlog
})(CreateBlog, showNotification);
export default ConnectedCreateBlog;
