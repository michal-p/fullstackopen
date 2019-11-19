import React from 'react'
import Name from './Name'


const Persons = ({persons, deletePerson}) => 
  persons.map(person => <Name key={person.name} name={person.name} number={person.number} deletePerson={() => deletePerson(person.id, person.name)}/>)

export default Persons