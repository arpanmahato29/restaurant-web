import React, { useState } from 'react'
import {authenticate, isAuthenticated, signin} from '../../auth/helper/index'
const MobileLoginForm = () => {

  const [user, setUser] = useState({
    email:'',
    password:''
  })

  const [error,setError] = useState(false);
  const [didRedirect, setDidRedirect] = useState(false);
  const {email, password} = user;
  const handleChange = inputTag => event => {
    setUser({...user,[inputTag]:event.target.value});
  }

  const handleSubmit = async event => {
    event.preventDefault();
    const data = await signin(user);
    if(data.error){
      setError(data.error);
    } else {
      authenticate(data,() => {
        setError(false);
        setUser({
          email:'',
          password:''
        })
        setDidRedirect(true);
      })
    }
  }

  const errorMessage = () => {
    if(error){
      return(
        <div className='alert alert-danger'>
          <small>{error}</small>
        </div>
      )
    }
  }

  const redirectOnSuccess = () => {
    if(didRedirect){
      if(isAuthenticated()){
        window.location.href = '/restaurant'
      }
    }
  }

  return (
    <form>
      {errorMessage()}
      {redirectOnSuccess()}
      <div className="form-group">
        <label
          className='pl-2 mobile-modal-body-label' 
          htmlFor="loginEmail"
        >
          Email address
        </label>
        <input 
          type="email" 
          className="form-control" 
          id="loginEmail" 
          aria-describedby="emailHelp"
          onChange={handleChange('email')}
          value={email}
        />
        <small 
          id="emailHelp" 
          className="form-text text-muted pl-2"
        >
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label 
          className='pl-2 mobile-modal-body-label'
          htmlFor="loginPassword"
        >
          Password
        </label>
        <input 
          type="password" 
          className="form-control " 
          id="loginPassword"
          onChange={handleChange('password')}
          value={password}
        />
      </div>
      <button 
        type="submit" 
        className="btn btn-danger btn-block"
        onClick={handleSubmit}
      >
        LOGIN
      </button>
    </form>
  )
}

export default MobileLoginForm
