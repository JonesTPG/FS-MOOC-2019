import React, { useState } from "react";

const Filter = ({ filterToApp }) => {
  const [newFilter, setNewFilter] = useState("");

  const handleFilterChange = event => {
    setNewFilter(event.target.value);
    filterToApp(event.target.value);
  };
  return (
    <>
      <p>filter shown with</p>
      <input value={newFilter} onChange={handleFilterChange} />
      <br />
      <br />
    </>
  );
};

export default Filter;
