import {API} from '../../backend';
import axios from 'axios'
export const signup = async user => {
  return await axios.post(
    `${API}/signup`,
    JSON.stringify(user),
    {
      headers: {
        Accept:'application/json',
        'Content-Type':'application/json'
      }
    }
  )
  .then(response => response.data)
  .catch(error => error.response.data);
};

export const signin = async user => {
  return await axios.post(
    `${API}/signin`,
    JSON.stringify(user),
    {
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      }
    }
  )
  .then(response => response.data)
  .catch(error => error.response.data)
};

export const authenticate = (data,next) => {
  if(typeof window !== 'undefined'){
    localStorage.setItem('jwt',JSON.stringify(data));
    next();
  }
}

export const logout = async () => {
  if(typeof window !== 'undefined'){
    localStorage.removeItem('jwt');
    window.location.replace('/');
    return await axios.get(`${API}/signout`)
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }
}

export const isAuthenticated = () => {
  if(typeof window == 'undefined'){
    return false;
  }
  if(localStorage.getItem('jwt')){
    return JSON.parse(localStorage.getItem('jwt'));
  } else{
    return false;
  }
}