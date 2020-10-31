import React from 'react'
import {FaPizzaSlice} from 'react-icons/fa'
const MobileHomeScreen = () => {
  return (
    <div className='container-s'>
      <div className='container-s mobile-home-header bg-orange'>
        <h1 className='brand text-white text-center mobile-home-brand'>
          <span>FOODIES<FaPizzaSlice size={30} /></span>
        </h1>
        <h5 className='text-white brand text-center pr-5'> LIVE FOR FOOD</h5>
      </div>
      <div className='container mobile-home-body'>
        <div className='col'>
          <h5 className='mobile-home-body-header'>ACCOUNT</h5>
          <small className='text-muted'>
            Login/Create Account quickly to manage orders
          </small>
          <button 
            className='btn btn-warning btn-lg btn-block mobile-btn-home btn-rounded-pill'
            data-toggle="modal" 
            data-target="#loginMobileModal"
            >
            LOGIN
          </button>
          <button 
            className='btn btn-warning btn-lg btn-block mobile-btn-home btn-rounded-pill'
            data-toggle="modal" 
            data-target="#signupMobileModal"
            >
            SIGNUP
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileHomeScreen
