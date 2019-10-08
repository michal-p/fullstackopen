import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value, handler}) => {

  return (
    <>
      <label>Search: </label>
      <input value={value} onChange={handler}/>
    </>
  )
}

const Forecast = ({location}) => {
  const [forecast, setForecast] = useState()
  const accessKey = 'a0a4841722ea35215f866af73f2c7eaf'

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${accessKey}&query=${location}`)
      .then( response =>  {
        setForecast(response.data)
      })
  }, [])

  if(forecast) {
    return (
      <>
        <h1>Weather in {location}</h1>
        <p><b>temperature:</b> {forecast.current.temperature} Celsius</p>
        <img alt={`temperature pictogram ${forecast.current.weather_descriptions}`} src={forecast.current.weather_icons[0]} />
        <p><b>wind:</b> {forecast.current.wind_speed} direction: {forecast.current.wind_dir}</p>
      </>
    )
  } else {
    return <p>Forecast is loading!</p>
  }
}

const Countries = ({countries, handler}) => {

  if(countries.length === 1) {
    return (
      countries.map(country => {
        return (
          <div key={country.numericCode}>
            <p key="name">Name: {country.name}</p>
            <p key="capital">Capital: {country.capital}</p>
            <p key="population">Population: {country.population}</p>
            <b>Languages: </b>
            <ul key="languages">
              {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
            </ul>
            <img alt={`flag of ${country.name}`} src={country.flag} width="200"/>
            <Forecast location={country.capital} />
          </div>
        )
      })
    )
  } else if(countries.length < 10) {
    return countries.map(country => {
      return(
        <p key={country.numericCode}>
          <span>{country.name}</span>
          <button value={country.name} onClick={handler}>show</button>
        </p>
      )
    })
  } else {
    return <p>Too many matches, specify another filter</p>
  }
}

function App() {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then( response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  let filteredCountries = countries.filter(country => country.name.toUpperCase().includes(newFilter.toUpperCase()))

  return (
    <>
      <Filter value={newFilter} handler={handleFilter} />
      <h3>Countries</h3>
      <Countries countries={filteredCountries}  handler={handleFilter}/>
    </>
  );
}

export default App;
