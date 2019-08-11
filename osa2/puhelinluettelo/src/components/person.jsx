import React from "react";

const Person = ({ data }) => {
  return (
    <>
      <p>
        {data.name} {data.number}
      </p>
    </>
  );
};

export default Person;
