import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <p>
        {" "}
        <Link to="/users">Users</Link> <Link to="/blogs">Blogs</Link>{" "}
      </p>
    </>
  );
};

export default Menu;
