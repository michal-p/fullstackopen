import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => {
		console.log("getAll promise fulfilled")
		return response.data
	})
}

const create = (newPerson) => {
	const request = axios.post(baseUrl, newPerson)
	return request.then(response => {
		console.log("create promise fulfilled")
		return response.data
	})
}

const erase = (id, name) => {
	const request = axios.delete(`${baseUrl}/${id}`)
	return request.then(response => {
		return response.data
	})
}

const update = (newPerson) => {
	const request = axios.put(`${baseUrl}/${newPerson.id}`, newPerson)
	return request.then(response => response.data)
}

export default {getAll, create, erase, update}