import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = newObject => {
	const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(request => request.data)
}

//Since the names of the keys and the assigned variables are the same, we can write the object definition with more compact syntax:
export default { getAll, create, update 	}