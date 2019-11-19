import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(initPersons => {
        setPersons(initPersons)
      })
  }, [])
  console.log('render', persons.length, 'notes')
  
  const addPerson = (event) => {
    event.preventDefault()
    let personObject = persons.find(p => p.name === newName)
    let doService = true
    if(!!personObject ) {
      personObject.number = newNumber
      Object.keys(personObject).forEach(key => {
        if(personObject[key].length === 0) {
          alert(`"${key}" is missing!`)
          doService = false
        }
      })
      if(doService && window.confirm(`${personObject.name} is already in phonebook, replace the old number with new one?`)) {
        personsService
          .update(personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personObject.id ? person : returnedPerson))
          })
      }
    } else {
      personObject = {
        name: newName,
        number: newNumber
      }
      Object.keys(personObject).forEach(key => {
        if(personObject[key].length === 0) {
          alert(`"${key}" is missing!`)
          doService = false
        }
      })
      if(doService) {
        personsService
          .create(personObject)
          .then(newPerson => {
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
          })
      }

    }
  }

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      personsService
        .erase(id, name)
        .then(response => setPersons(persons.filter(person => person.id !== id)))
        .catch(error => {
          alert(`The person ${name} has been already deleted.`)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }
  let filteredPersons = persons.filter(p => p.name.toUpperCase().includes(newFilter.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson}/>
      <div>debug: {newName}</div>
    </div>
  )
}

export default App