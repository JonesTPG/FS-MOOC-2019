import React from "react";
import CountryDetail from "./countrydetail";

const Content = ({ list, filter, showDetails }) => {
  let filtered = list.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  let showCountryDetails = name => () => {
    showDetails(name);
  };

  if (filtered.length <= 10 && filtered.length >= 2) {
    return (
      <>
        {filtered.map(country => (
          <div key={country.name}>
            <p>{country.name}</p>
            <button onClick={showCountryDetails(country.name)}>show</button>
          </div>
        ))}
      </>
    );
  } else if (filtered.length === 1) {
    return (
      <>
        <CountryDetail countryData={filtered[0]} />
      </>
    );
  } else if (filtered.length === 0) {
    return <p>No matches found.</p>;
  } else {
    return (
      <>
        <p>Too many matches, specify another filter</p>
      </>
    );
  }
};

export default Content;
