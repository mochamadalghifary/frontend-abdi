import axios from 'axios.js'
import endpoint from "app/api/endpoint"


export const postPatients = async (patient) => {
  const response = await axios.post(endpoint.patients.root, {
    name: patient.firstName,
    description: patient.description,
    birthPlace: '',
    birth: patient.date,
    age: 0,
    address: patient.address,
    phone: patient.phone,
  })
  
  return response.data.data
}

export const getPatients = async () => {
  const response = await axios.get(endpoint.patients.root)

  return response.data.data
}

export const getPatient = async (id) => {
  const response = await axios.get(endpoint.patients.root + '/' + id)

  return response.data.data
}

export const putPatient = async (patient) => {
  const response = await axios.put(endpoint.patients.root + '/' + patient.id, {
    name: patient.firstName,
    description: patient.description,
    birthPlace: patient.birthPlace,
    birth: patient.date,
    age: patient.age,
    address: patient.address,
    phone: patient.phone,
  })

  return response.data.data
}

export const delPatient = async (id) => {
  const response = await axios.delete(endpoint.patients.root + '/' + id)

  return response.data.data
}