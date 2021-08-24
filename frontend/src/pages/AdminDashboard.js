import React from 'react'
import MobileNavbar from '../smaller_screen/core/MobileNavbar'
import {IoMdArrowRoundBack} from 'react-icons/io'
import MobileAdminDashboard from '../smaller_screen/admin/MobileAdminDashboard'
const AdminDashboard = () => {

  const handleGoBack = event =>{
    event.preventDefault();
    if(window.history.length === 1){
      window.location.href = '/restaurant'
    } else {
      window.history.back();
    }
  }

  if(window.innerWidth > 720){
    return(
      <div className='container'>

      </div>
    )
  } else{
    return(
      <div className='container-s mobile-container'>
        <div className='container mobile-address-header d-flex justify-content-start my-4 text-muted'>
          <IoMdArrowRoundBack size={30} onClick={handleGoBack}/>
          <h3 className='pl-5'>Admin Panel</h3>
        </div>
        <div className='container' style={{overflowY:'scroll', height:'75vh'}}>
          <MobileAdminDashboard />
        </div>
        <div className='mobile-navbar-controller mobile-border-top'>
          <MobileNavbar />
        </div>
      </div>
    )
  }
}

export default AdminDashboard
