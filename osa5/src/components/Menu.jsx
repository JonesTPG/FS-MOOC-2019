import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <p>
        <Link data-cy="user-link" to="/users">
          Users
        </Link>
        {"   "}
        <Link data-cy="blogs-link" to="/blogs">
          Blogs
        </Link>
      </p>
    </>
  );
};

export default Menu;
