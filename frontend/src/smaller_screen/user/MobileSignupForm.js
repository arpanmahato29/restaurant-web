import React, { useState } from 'react'
import {authenticate, signup, isAuthenticated} from '../../auth/helper/index'
import MobileSignupModal from '../core/MobileSignupModal';
const MobileSignupForm = () => {

  const [user, setUser] = useState({
    name:'',
    email:'',
    phone:'',
    password:'',
  })

  const [error,setError] = useState(false);
  const [didRedirect, setDidRedirect] = useState(false);
  const {name,email,phone, password} = user;
  const handleChange = inputTag => event => {
    setUser({...user,[inputTag]:event.target.value});
  }

  const handleSubmit = async event => {
    event.preventDefault();
    const data = await signup(user);
    if(data.error){
      setError(data.error);
    } else {
      authenticate(data,() => {
        setError(false);
        setUser({
          name:'',
          email:'',
          phone:'',
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
          htmlFor="signupName"
        >
          Name
        </label>
        <input 
          type="text" 
          className="form-control " 
          id="signupName" 
          onChange={handleChange('name')}
          value={name}
        />
      </div>
      <div className="form-group">
        <label
          className='pl-2 mobile-modal-body-label' 
          htmlFor="signupEmail"
        >
          Email
        </label>
        <input 
          type="email" 
          className="form-control " 
          id="signupEmail" 
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
          htmlFor="signupPhone"
        >
          Phone
        </label>
        <input 
          type="tel" 
          className="form-control " 
          id="signupPhone" 
          aria-describedby="phoneHelp"
          onChange={handleChange('phone')}
          value={phone}
        />
        <small 
          id="emailHelp" 
          className="form-text text-muted pl-2"
        >
          We'll never share your number with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label 
          className='pl-2 mobile-modal-body-label'
          htmlFor="signupPassword"
        >
          Password
        </label>
        <input 
          type="password" 
          className="form-control " 
          id="signupPassword"
          onChange={handleChange('password')}
          value={password}
        />
      </div>
      <button 
        type="submit" 
        className="btn btn-danger btn-block"
        onClick={handleSubmit}
      >
        SIGN UP
      </button>
    </form>
  )
}

export default MobileSignupForm
