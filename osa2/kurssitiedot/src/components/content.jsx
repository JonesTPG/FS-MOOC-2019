import React from "react";
import Part from "./part";

const Content = ({ contents }) => {
  return (
    <>
      {contents.map(content => (
        <Part part={content} key={content.id} />
      ))}
    </>
  );
};
export default Content;
