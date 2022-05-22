import axios from 'axios.js'
import endpoint from "app/api/endpoint"


export const postCheckUp = async (checkUp) => {
  const response = await axios.post(endpoint.checkUpHistories.root, {
    patientId: checkUp.patientId,
    ilness: checkUp.ilness,
    description: checkUp.description,
  })
  
  return response.data.data
}

export const getCheckUps = async () => {
  const response = await axios.get(endpoint.checkUpHistories.root)

  return response.data.data
}

export const getCheckUp = async (id) => {
  const response = await axios.get(endpoint.checkUpHistories.root + '/' + id)

  return response.data.data
}

export const delCheckUp = async (id) => {
  const response = await axios.delete(endpoint.checkUpHistories.root + '/' + id)

  return response.data.data
}