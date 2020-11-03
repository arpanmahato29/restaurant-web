import React from 'react'
import MobileNavbar from '../smaller_screen/core/MobileNavbar'

function Restaurant() {
  if(window.innerWidth > 720){
    return(
      <div className='container'>

      </div>
    )
  } else {
    return(
      <div className='container-s mobile-container'>
        <div className='mobile-navbar-controller mobile-border-top'>
          <MobileNavbar />
        </div>
      </div>
    )
  }
}

export default Restaurant
