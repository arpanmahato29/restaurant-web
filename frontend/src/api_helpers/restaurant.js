import {API} from '../backend'
import axios from 'axios'

export const createRestaurant = async(userId,token,sellerId,name) => {
  const data = await axios.post(
    `${API}/restaurant/create/${userId}`,
    JSON.stringify({name:name,owner:sellerId}),
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

export const getRestaurants = async () => {
  const data = await axios.get(
    `${API}/restaurants`
  )
  .then(response => response.data)
  .catch(error => error.response.data);
  return data;
}

export const getSellerRestaurant = async(userId,token) => {
  const data = await axios.get(
    `${API}/restaurants/${userId}`,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  )
  .then(response => response.data)
  .catch(error => error.response.data);
  return data;
}