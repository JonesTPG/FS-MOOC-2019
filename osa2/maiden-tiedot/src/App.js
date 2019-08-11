import React, { useState, useEffect } from "react";
import axios from "axios";
import Content from "./components/content";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = event => {
    setNewFilter(event.target.value);
  };

  const showDetailsFromButton = name => {
    setNewFilter(name);
  };

  return (
    <>
      <p>find countries</p>
      <input value={newFilter} onChange={handleFilterChange} />
      <Content
        list={countries}
        filter={newFilter}
        showDetails={showDetailsFromButton}
      />
    </>
  );
};

export default App;
