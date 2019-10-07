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

const Countries = ({countries, handler}) => {

  if(countries.length === 1) {
    // const countryObj = {
    //   name: countries[0].name,
    //   capital: countries[0].capital,
    //   population: countries[0].population,
    //   languages: countries[0].languages
    // }

    // const getKeys = (obj = Object.keys(countryObj)) => {
    //   debugger
    //     return obj.map((key, i) => {
    //       debugger
    //       if(Array.isArray(countryObj[key])) {
    //         getKeys(countryObj[key])
    //       }
    //       return <p key={i}>{countryObj[key]}</p>
    //     }
    //   )
    // }

    return (//Object.keys(countryObj).map((key, i) => <p key={i}>{countryObj[key]}</p>)
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
            {/* {getKeys()} */}
            {/* {Object.keys(countryObj).map(
              (key, i) => {
                return <p key={i}>{countryObj[key]}</p>
              }
            )} */}
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
