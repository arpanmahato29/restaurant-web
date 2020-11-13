import axios from "axios"

export const createProduct = async (userId,token,product) =>{
  const data = await axios.post(
    `${API}/product/create/${userId}`,
    product,
    {
      headers:{
        Accept:'application/json',
        Authorization:`Bearer ${token}`
      }
    }
  ).then(response => response.data)
  .catch(error => error.response.data)

  console.log(data);
  return data;
}

export const getProduct = async (productId) => {
  const data = await axios.get(
    `${API}/product/${productId}`,
  ).then(response => response.data)
  .catch(error => error.response.data)

  console.log(data);
  return data; 
}

export const updateProduct = async (userId,token,productId,product) => {
  const data = await axios.put(
    `${API}/product/${productId}/${userId}`,
    product,
    {
      headers:{
        Accept:'application/json',
        Authorization:`Bearer ${token}`
      }
    }
  ).then(response => response.data)
  .catch(error => error.response.data)

  console.log(data);
  return data; 
}

export const deleteProduct = async (userId,token,productId) => {
  const data = await axios.delete(
    `${API}/product/${productId}/${userId}`,
    {
      headers:{
        Accept:'application/json',
        Authorization:`Bearer ${token}`
      }
    }
  ).then(response => response.data)
  .catch(error => error.response.data)

  console.log(data);
  return data; 
}