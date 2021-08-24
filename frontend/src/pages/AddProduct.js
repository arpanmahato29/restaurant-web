import React from 'react'
import {IoMdArrowRoundBack} from 'react-icons/io'
import MobileNavbar from '../smaller_screen/core/MobileNavbar'
import MobileAddProduct from '../smaller_screen/seller/MobileAddProduct'
const AddProduct = () => {

  const handleGoBack = event =>{
    event.preventDefault();
    if(window.history.length === 1){
      window.location.href = '/restaurant'
    } else {
      window.history.back();
    }
  }

  if(window.innerWidth > 720){
    return (
      <div>

      </div>
    )
  } else {
    return(
      <div className='container-s'>
        <div className='container mobile-address-header d-flex justify-content-start my-4 text-muted'>
          <IoMdArrowRoundBack size={30} onClick={handleGoBack}/>
          <h3 className='pl-5 ml-2'>Add Product</h3>
        </div>
        <div className='container' style={{overflowY:'scroll', height:'70vh'}}>
          <MobileAddProduct />
        </div>
        <div className='mobile-navbar-controller mobile-border-top'>
          <MobileNavbar />
        </div>
      </div>
    )
  }
}

export default AddProduct
