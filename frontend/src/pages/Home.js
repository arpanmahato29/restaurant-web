import React from 'react'
import { isAuthenticated } from '../auth/helper'
import MobileHomeScreen from '../smaller_screen/core/MobileHomeScreen'
import MobileLoginModal from '../smaller_screen/core/MobileLoginModal'
import MobileSignupModal from '../smaller_screen/core/MobileSignupModal'
import '../styles/home.css'
const home = () => {

  if(isAuthenticated()){
    window.location.href = '/restaurant'
  }
  
  if(window.innerWidth > 720){
    return (
      <div className='container-fluid'>
        pc component
      </div>
    )
  } else {
    return(
      <div>
        <MobileHomeScreen />
        <MobileLoginModal />
        <MobileSignupModal />
      </div>
    )
  }
}

export default home
