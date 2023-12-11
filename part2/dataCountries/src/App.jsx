import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryViewer = (props) => {
  if (props.countries.length > 10) {
    return (<p> Too many matches, specify antoher filter</p >)
  }
  else if (props.countries.length <= 10 && props.countries.length > 1) {
    return (
      <>
        {
          props.countries.map(country => (
            <div key={country["cca2"]} >
              <span >{country["name"]["common"]}</span>
              <button onClick={() => props.handleShow(country["cca2"])}>show</button>
            </div >
          ))
        }
      </>
    )
  }

  else if (props.countries.length === 1) {
    return (
      <>{
        props.countries.map(country => (

          <div key={country["altSpellings"][0]} >

            <h1>{country["name"]["common"]}</h1>
            <p><b>Capital: </b>{country["capital"]}</p>
            <p><b>Population: </b>{country["population"]}</p>
            <h3>Languages</h3>

            <ul>
              {
                Object.values(country["languages"]).map((val, k) => <li key={k}>{val}</li>)
              }
            </ul>

            <img width="200px" height="150px" src={country["flags"]["svg"]} />

            <h3>Wheather in {country["capital"]}</h3>

            <p><b>Temperature : </b>{props.weather["current"] && props.weather["current"].temperature} C°</p>

            <img width="100px" height="100px" src={props.weather["current"] && props.weather["current"].weather_icons} />

            <p><b>wind : </b>
              {props.weather["current"] && props.weather["current"].wind_speed} mph
              direction{props.weather["current"] && props.weather["current"].wind_dir}</p>
          </div >

        ))
      }

      </>
    )

  }
  else if (props.notFound) {
    return (<p>No country has been found</p>)
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [weather, setweather] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [originalCountries, setOriginalCountries] = useState([]);
  const [notFound, setNotFound] = useState(false)


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {

        setCountries(response.data);
        setOriginalCountries(response.data);
        setNotFound(false);

      })
  }, [])

  useEffect(() => {
    const api_key = import.meta.env.VITE_TAL
    if (countries.length === 1) {
      axios
        .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + countries[0]["name"]["common"])
        .then(response => {
          setweather(response.data)

        })
    }

  }, [countries])

  const handleSearch = (event) => {
    if (countries.length == 0) {
      setNotFound(true);
    }
    const found = originalCountries.filter(item => item["name"]["common"].toLowerCase().includes(event.target.value.toLocaleLowerCase()))
    console.log("propio", weather)
    setCountries(found)
    setNewSearch(event.target.value)

  }

  const handleShow = (name) => {

    const found = originalCountries.filter(item => item["cca2"].includes(name))
    setCountries(found)

  }
  return (
    <>
      find countries :
      <input
        value={newSearch}
        onChange={handleSearch} />

      <CountryViewer countries={countries} notFound={notFound} handleShow={handleShow} weather={weather} />
    </>
  )
}

export default App
