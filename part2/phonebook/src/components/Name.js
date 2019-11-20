import React from 'react'

const Name = ({name, number, deletePerson}) => {
	return (
		<>
			<p>{name} {number}</p>
			<button onClick={deletePerson}>delete</button>
		</>
	)
}

export default Name