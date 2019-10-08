import React from 'react'
import Forecast from './Forecast'

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

export default Countries