import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import './index.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage] = useState(null)
  const [ type, setType ] = useState('note')
  //TODO tu by som mal taku otazku na niekoho skusenejsieho ci sa to da 
  //robit aj inaksie ako stale vytvarat useState. Popripade ak je to ok, 
  //tak ci to nie je problem mat vela useState.

  //Dalej useEffect vyuzivam iba tu na ostatnych asynchronnych volaniach nie preco???
  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(initPersons => {
        setPersons(initPersons)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const showHideNotification = (message, type) => {
    setNotificationMessage(message)
    setType(type)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000);
  }
  
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
            showHideNotification(`${returnedPerson.name} has a new number.`, 'note')
          })
          .catch(error => {
            showHideNotification(`The person ${personObject.name} does not exist.`, 'error')
            setPersons(persons.filter(p => p.id !== personObject.id))
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
            showHideNotification(`${newPerson.name} has been created.`, 'note')
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            showHideNotification(`The person ${personObject.name} is not possible to create.`, 'error')
          })
      }

    }
  }

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      personsService
        .erase(id, name)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          showHideNotification(`${name} has been deleted.`, 'note')
        })
        .catch(error => {
          showHideNotification(`The person ${name} has been already deleted.`, 'error')
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
      <Notification message={notificationMessage} type={type} />
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson}/>
      <div>debug: {newName}</div>
      <Footer />
    </div>
  )
}

export default App