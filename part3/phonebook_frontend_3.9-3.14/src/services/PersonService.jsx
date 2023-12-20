import axios from 'axios'

//const baseUrl = '/api/persons';
const baseUrl = 'http://localhost:3001/api/persons';
const getAll = () => {
    const request = axios.get(baseUrl)
    console.log(request.then(response => response.data))
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data)
        .catch(error => {
            if (error.response) {
                throw new Error(error.response.data.error);
            }
        });
};


const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
        .catch(error => {
            if (error.response) {
                throw new Error(error.response.data.error);
            }
        });
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)

    return request.then(response => response.data)
}

export default { getAll, create, update, deleteContact }