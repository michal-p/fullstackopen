import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

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

export default App
