import React from 'react'
import {Link} from 'react-router-dom'
import {FaRupeeSign,FaRegEdit,FaRegWindowClose} from 'react-icons/fa'
import {RiRestaurantLine} from 'react-icons/ri'
import {MdPlaylistAdd} from 'react-icons/md'
import MobileAddProductModal from './MobileAddProductModal'
const MobileSellerDashboard = () => {
  return (
    <div className='container-s'>
      <MobileAddProductModal />
      <div className='user mobile-admin-card'>
        <div class="card bg-orange" >
          <div class="card-body mobile-admin-card-body d-flex justify-content-between text-white">
            <div className='m-2'>
              <h5 class="card-title">Today's Sales</h5>
              <div className='row ml-2'>
              <FaRupeeSign className='mt-2 mr-2' size={35}/>
              <h1 className='mobile-card-text '>1000.00</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=' container'>
        <div className='row mx-3'>
          <div 
            className='col bg-light text-muted m-1 px-3 py-2 mobile-admin-btn' 
            data-toggle="modal" 
            data-target="#addProductModal"
          >
            <div className='d-flex flex-column'>
            <MdPlaylistAdd className='mx-auto' size={40}/>
            <small className='text-muted text-center mobile-admin-btn-text'>Add Product</small>
            </div>
          </div>
          <Link 
            className='col bg-light text-muted m-1 px-3 py-2 mobile-admin-btn'
            to='/seller-dashboard/manage-products'
          >
            <div className='d-flex flex-column'>
              <FaRegEdit className='mx-auto' size={40}/>
              <small className='text-muted text-center mobile-admin-btn-text'>Manage Products</small>
            </div>
          </Link>
          <div
            className='col bg-light text-muted m-1 px-3 py-2 mobile-admin-btn' 
            data-toggle="modal" 
            data-target="#removeSellerModal"
          >
            <div className='d-flex flex-column'>
            <FaRegWindowClose className='mx-auto' size={40}/>
            <small className='text-muted text-center mobile-admin-btn-text'>Remove Product</small>
            </div>
          </div>
          <div
            className='col bg-light text-muted m-1 px-3 py-2 mobile-admin-btn' 
            data-toggle="modal" 
            data-target="#addRestaurantModal"
          >
            <div className='d-flex flex-column'>
            <RiRestaurantLine className='mx-auto' size={40}/>
            <small className='text-muted text-center mobile-admin-btn-text'>Manage Restaurant</small>
            </div>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default MobileSellerDashboard
