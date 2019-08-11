import React from "react";

const CountryDetail = ({ countryData }) => {
  return (
    <>
      <h3>{countryData.name}</h3>
      <br />
      <p>capital {countryData.capital}</p>
      <p>population {countryData.population}</p>
      <h4>languages</h4>
      <ul>
        {countryData.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={countryData.flag} height="100" width="200" alt="flag" />
    </>
  );
};

export default CountryDetail;
