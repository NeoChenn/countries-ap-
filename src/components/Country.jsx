import React, { useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link, useSearchParams } from "react-router-dom";

export default function Country({ darkMode }) {
  const [countries, setCountries] = React.useState([]);
  const [displayedCountries, setDisplayedCountries] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const regionFilter = searchParams.get("region");
  const searchFilter = searchParams.get("search");

  function handleFilterChange(key, value) {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    setSearchParams(params.toString());
  }

  const [filterClick, setFilterClick] = React.useState(true);

  const onInputChange = (e) => {
    handleFilterChange("search", e.target.value);
  };

  const onSelectChange = (e) => {
    setFilterClick(false);
    handleFilterChange("region", e.target.value);
  };

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const retrievedData = await response.json();
      setCountries(retrievedData);
      setDisplayedCountries(retrievedData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    filteredCountries();
  }, [searchFilter, regionFilter]);

  const filteredCountries = () => {
    let regionFilteredCountries = countries;
    if (regionFilter && regionFilter !== "") {
      regionFilteredCountries = countries.filter(
        (country) => country.region === regionFilter
      );
    }

    let fullyFilteredCountries = regionFilteredCountries;
    if (searchFilter && searchFilter !== "") {
      fullyFilteredCountries = regionFilteredCountries.filter((country) =>
        country.name.common
          .toString()
          .toLowerCase()
          .includes(searchFilter.toString().toLowerCase())
      );
    }
    setDisplayedCountries(fullyFilteredCountries);
  };

  const displayCountries = displayedCountries.map((country, index) => {
    return (
      <Link
        to={`${index}`}
        className="countryContainer"
        key={country.name.common}
      >
        <img src={country.flags.png} alt={country.name.common} />
        <div
          className={
            darkMode ? "countryText darkCountry" : "countryText lightCountry"
          }
        >
          <h3>{country.name.common}</h3>
          <p>
            <span>Population: </span>
            {country.population}
          </p>
          <p>
            <span>Region: </span>
            {country.region}
          </p>
          <p>
            <span>Capital: </span>
            {country.capital}
          </p>
        </div>
      </Link>
    );
  });

  return (
    <>
      <main className={darkMode ? "darkMain" : "lightMain"}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={darkMode ? "search darkInput" : "search lightInput"}>
            <FaMagnifyingGlass
              className={
                darkMode ? "magnifying darkGlass" : "magnifying lightGlass"
              }
            />
            <input
              id={darkMode ? "darkInput" : "lightInput"}
              type="text"
              placeholder="Search for a country..."
              onChange={onInputChange}
            />
          </div>
          <select
            className={darkMode ? "darkSelect" : "lightSelect"}
            onChange={onSelectChange}
          >
            <option value="" selected>
              {filterClick ? "Filter by region" : "All"}
            </option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia"> Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </form>
        <div className="countriesContainer">{displayCountries}</div>
      </main>
    </>
  );
}
