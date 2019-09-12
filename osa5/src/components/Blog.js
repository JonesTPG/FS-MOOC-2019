import React from "react";
import { useState } from "react";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div style={blogStyle}>
      <div onClick={() => toggleDetails()}>
        {blog.title} {blog.author}
        {showDetails ? (
          <div>
            <p>{blog.url}</p>
            <p>{blog.likes}</p>
            <button>like</button>
            <p>added by {blog.user.name}</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Blog;
