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

export const updateUser = async (userId,token,updatedData) => {
  const data = await axios.put(
    `${API}/user/${userId}`,
    JSON.stringify(updatedData),
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
  console.log(data);
  return data;
}

export const userCount = async (userId,token,role) => {
  const data = await axios.post(
    `${API}/user/count/${userId}`,
    JSON.stringify(role),
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

export const searchUser = async (userId,token,email) =>{
  const data = await axios.post(
    `${API}/admin/search/${userId}`,
    JSON.stringify(email),
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

export const upgradeRole = async (userId,token,sellerId,role) => {
  const data = await axios.put(
    `${API}/admin/upgrade-to-seller/${userId}`,
    JSON.stringify({_id:sellerId,role:role}),
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
