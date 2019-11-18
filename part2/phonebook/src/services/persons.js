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

export default {getAll, create}