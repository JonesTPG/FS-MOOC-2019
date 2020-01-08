import React from "react";
import { Button } from "semantic-ui-react";

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div>
      {blog.title} {blog.author}
    </div>
    <div>
      blog has {blog.likes} likes
      <Button className="button" onClick={onClick}>
        like
      </Button>
    </div>
  </div>
);

export default SimpleBlog;
