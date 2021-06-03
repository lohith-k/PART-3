import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll=()=>
{
    const request=axios.get(baseUrl)
    return request.then(response => {
        return response.data})
}

const addPerson=(personObject)=>
{
    const request=axios.post(baseUrl,personObject)
    return request.then(response =>  response.data)
}
const rPerson=(id)=>
{
  return  axios.delete(`${baseUrl}/${id}`).then(response =>  response.data)
}
const updateNumber=(id,personObject)=>
{
    const request = axios.put(`${baseUrl}/${id}`, personObject)
    return request.then(response => response.data)
}

export default {
    getAll,addPerson,rPerson,updateNumber

}