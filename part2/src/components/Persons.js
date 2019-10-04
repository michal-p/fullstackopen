import React from 'react'
import Name from './Name'

const Persons = ({persons}) => 
  persons.map(person => <Name key={person.name} name={person.name} number={person.number}/>)

export default Persons