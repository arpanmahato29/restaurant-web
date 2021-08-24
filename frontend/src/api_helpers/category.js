import {API} from '../backend'
import axios from 'axios'

export const createCategory = async (userId, token , category) => {
  const data = await axios.post(
    `${API}/category/create/${userId}`,
    JSON.stringify(category),
    {
      headers:{
        'Content-Type':'application/json',
        Accept:'aapplication/json',
        Authorization:`Bearer ${token}`
      }
    }
  )
  .then(response=>response.data)
  .catch(error=>error.response.data)

  return data;
}

export const getAllCategories = async () => {
  const data = await axios.get(
    `${API}/categories`,
  )
  .then(response=>response.data)
  .catch(error=>error.response.data)
  return data;
}

export const updateCategory = async (userId,token,categoryId,name) => {

  const data = await axios.put(
    `${API}/category/${categoryId}/${userId}`,
    JSON.stringify(name),
    {
      headers:{
        'Content-Type':'application/json',
        Accept:'aapplication/json',
        Authorization:`Bearer ${token}`
      }
    }
  )
  .then(response => response.data)
  .catch(error => error.response.data)
  console.log(data);
  return data;
}

export const deleteCategory = async (userId,token,categoryId) => {
  const itemsInCategory = await axios.post(
    `${API}/category/products`,
    JSON.stringify(categoryId),
    {
      headers:{
        'Content-Type':'application/json',
        Accept:'aapplication/json',
        Authorization:`Bearer ${token}`
      }
    }
  ).then(response => response.data)
  .catch(error => error.response.data)

  if(!itemsInCategory){
    const data = await axios.delete(
      `${API}/category/${categoryId._id}/${userId}`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    ).then(response => response.data)
    .catch(error => error.response.data)

    return data;
  } 
  return({error:'Cannot DELETE the category'})
}