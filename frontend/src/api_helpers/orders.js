import {API} from '../backend'
import axios from 'axios'

export const getUserAllOrder = async (userId,token) => {
  console.log(userId)
  return await axios.get(
    `${API}/user/orders/${userId}`,
    {
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
  ).then(response => response.data)
  .catch(error => error.response.data)
}