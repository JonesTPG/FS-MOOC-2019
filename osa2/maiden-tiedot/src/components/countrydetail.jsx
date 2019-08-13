import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryDetail = ({ countryData }) => {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    axios
      .get(
        "http://api.apixu.com/v1/current.json?key=f83e894e97624aea833145251191308&q=" +
          countryData.capital
      )
      .then(response => {
        console.log(response.data);
        setWeatherData(response.data);
      });
  }, []);

  return (
    <>
      {weatherData.current == undefined ? (
        <p>not rendered yet</p>
      ) : (
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
          <h4>Weather in {countryData.capital}</h4>
          <h5>temperature: {weatherData.current.temp_c} Celsius</h5>
          <img src={"https:" + weatherData.current.condition.icon} alt="icon" />
          <h5>
            wind: {weatherData.current.wind_kph} kph direction{" "}
            {weatherData.current.wind_dir}
          </h5>
        </>
      )}
    </>
  );
};

export default CountryDetail;
