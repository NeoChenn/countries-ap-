import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function CountryDetail({ darkMode }) {
  const params = useParams();
  const [country, setCountry] = React.useState(null);
  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const retrievedData = await response.json();
      setCountry(retrievedData[params.id]);
    }
    fetchData();
  }, [params.id]);

  return (
    <>
      {country && (
        <div className={darkMode ? "details darkMain" : "details lightMain"}>
          <Link to="/" className={darkMode ? "darkNav" : "lightNav"}>
            {<FaArrowLeftLong />}
            <p>Back</p>
          </Link>
          <div className="detailsContainer">
            <img src={country.flags.png} alt={country.name.common} />
            <div
              className={
                darkMode
                  ? "detailsTextContainer darkText"
                  : "detailsTextContainer lightText"
              }
            >
              <h3>{country.name.common}</h3>
              <div className="smallDetailsContainer">
                <div>
                  <p>
                    <span>Native names: </span>
                    {
                      Object.values(country.name.nativeName)[
                        Object.values(country.name.nativeName).length - 1
                      ].common
                    }
                  </p>
                  <p>
                    <span>Population: </span>
                    {country.population}
                  </p>
                  <p>
                    <span>Region: </span>
                    {country.region}
                  </p>
                  <p>
                    <span>Sub Region: </span>
                    {country.subregion}
                  </p>
                  <p>
                    <span>Capital: </span>
                    {country.capital[0]}
                  </p>
                </div>
                <div>
                  <p>
                    <span> Top Level Domain: </span>
                    {country.tld[0]}
                  </p>
                  <p>
                    <span>Currencies: </span>
                    {Object.values(country.currencies)[0].name}
                  </p>
                  <p>
                    <span>Languages: </span>
                    {Object.values(country.languages).join(", ")}
                  </p>
                </div>
              </div>
              <div className="bordersContainer">
                <p style={{ fontWeight: 700 }}>Border Countries:</p>
                {country.borders &&
                  country.borders.map((border) => (
                    <p
                      className={
                        darkMode
                          ? "borderCountry darkNav"
                          : "borderCountry lightNav"
                      }
                    >
                      {border}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
