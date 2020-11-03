import {API} from '../backend';
import axios from 'axios'

export const userAddress = async (userId,token) => {
  return await axios.get(
    `${API}/user/address/${userId}`,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  )
  .then(response => response.data)
  .catch(error => error.response.data)
}

export const updateUser = async (userId,token,address) => {
  const data = await axios.put(
    `${API}/user/${userId}`,
    JSON.stringify(address),
    {
      headers: {
        'Content-Type':'application/json',
        Accept: 'application/json',
        Authorization:`Bearer ${token}`
      }
    }
  )
  .then(response => response.data)
  .catch(error => error.response.data)

  return data;
}