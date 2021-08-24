import React from 'react'
import MobileNavbar from '../smaller_screen/core/MobileNavbar'
import MobileProfile from '../smaller_screen/user/MobileProfile'
import cover from '../images/cover.jpg'
import '../styles/profile.css'
import { RiLogoutBoxFill } from 'react-icons/ri'
import { logout } from '../auth/helper'
const Profile = () => {

  const handleLogout = event => {
    logout();
    window.location.href = '/'
  }

  if(window.innerWidth > 720){
    return(
      <div className='container'>

      </div>
    )
  } else {
    return(
      <div className='container-s mobile-container'>
        <div className='mobile-profile-header' />
        <div className='mobile-profile-picture-container'>
        {/* TODO: add user profile photo here*/}
            <img src={cover} className='img-thumbnail mobile-profile-picture' width='150px' />
        </div>
        <div className='container mobile-profile-body'>
          <MobileProfile/>
        </div>
        <div className='container mobile-logout-button px-5'>
          <button className='btn btn-danger btn-block mt-3' onClick={handleLogout}>LOGOUT</button>
        </div>
        <div className='mobile-navbar-controller mobile-border-top'>
          <MobileNavbar />
        </div>
      </div>
    )
  }
}

export default Profile

