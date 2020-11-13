import React from 'react'
import MobileNavbar from '../smaller_screen/core/MobileNavbar'
import MobileRestaurantMain from '../smaller_screen/restaurant/MobileRestaurantMain'

function Restaurant() {

  if(window.innerWidth > 720){
    return(
      <div className='container'>

      </div>
    )
  } else {
    return(
      <div className='container-s mobile-container'>
        <div className='container mobile-restaurant-search mb-3'>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2 mr-1" type="search" placeholder="Search" style={{width:'75%'}}/>
            <button className="btn btn-danger my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
        <div className='container-s' style={{overflowY:'scroll', height:'90vh'}}>
          <MobileRestaurantMain/>
        </div>
        <div className='mobile-navbar-controller mobile-border-top'>
          <MobileNavbar />
        </div>
      </div>
    )
  }
}

export default Restaurant
