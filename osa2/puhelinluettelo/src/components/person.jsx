import React from "react";

const Person = ({ data, deletePerson }) => {
  return (
    <>
      <p>
        {data.name} {data.number}
      </p>

      <button onClick={() => deletePerson(data.id)}>poista</button>
    </>
  );
};

export default Person;
