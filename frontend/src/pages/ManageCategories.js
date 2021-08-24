import React from 'react'
import {IoMdArrowRoundBack} from 'react-icons/io'
import MobileNavbar from '../smaller_screen/core/MobileNavbar'
import MobileManageCategories from '../smaller_screen/admin/MobileManageCategories'
function ManageCategories() {

  const handleGoBack = event => {
    event.preventDefault();
    if(window.history.length === 1){
      window.location.href = '/restaurant'
    } else {
      window.history.back();
    }
  }

  if(window.innerWidth > 720){
    return(
      <div>

      </div>
    )
  } else {
    return (
      <div className='container-s'>
        <div className='container mobile-address-header d-flex justify-content-start my-4 text-muted'>
          <IoMdArrowRoundBack size={30} onClick={handleGoBack}/>
          <h3 className='pl-4'>Manage Categories</h3>
        </div>
        <div className='container-s' style={{overflowY:'scroll', height:'70vh'}}>
          <MobileManageCategories/>
        </div>
        <div className='mobile-navbar-controller mobile-border-top'>
          <MobileNavbar />
        </div>
      </div>
    )
  }
}

export default ManageCategories
