import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { userCount } from '../../api_helpers/user';
import { isAuthenticated } from '../../auth/helper';
import {RiUserUnfollowLine,RiRestaurantLine} from 'react-icons/ri'
import {FaUsers ,FaUserTag,FaRegEdit} from 'react-icons/fa'
import {MdPlaylistAdd} from 'react-icons/md'
import MobileAddCaregoryModel from './MobileAddCaregoryModel';
import MobileRemoveSellerModal from './MobileRemoveSellerModal';
import MobileAddRestaurantModal from '../restaurant/MobileAddRestaurantModal';
function MobileAdminDashboard() {

  const [noOfUser, setNumberOfUser] = useState(0);
  const [noOfSeller, setNumberOfSeller] = useState(0);

  const {user,token} = isAuthenticated();

  useEffect(() => {
    async function fetchData(){
      const tempSellerCount = await userCount(user._id,token,{role:1})
      const tempUserCount = await userCount(user._id,token,{role:0})
      setNumberOfSeller(tempSellerCount);
      setNumberOfUser(tempUserCount);
    }
    fetchData();
  }, [])



  return (
    <div className='container'>
      <MobileAddCaregoryModel />
      <MobileRemoveSellerModal />
      <MobileAddRestaurantModal />
      <div className='container-s'>
        <div className='user mobile-admin-card'>
          <div class="card bg-orange" >
            <div class="card-body mobile-admin-card-body d-flex justify-content-between text-white">
              <div className='mobile-admin-card-icon'>
                <FaUsers className='mobile-admin-card-icon-main' size={70}/>
              </div>
              <div className='m-2'>
                <h5 class="card-title">Current User</h5>
                <div className='d-flex justify-content-end'>
                  <h1 className='mobile-card-text '>{noOfUser}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='seller mobile-admin-card'>
          <div class="card bg-secondary-orange" >
            <div class="card-body mobile-admin-card-body d-flex justify-content-between text-white">
              <div className='mobile-admin-card-icon'>
                <FaUserTag className='mobile-admin-card-icon-main' size={70}/>
              </div>
              <div className='m-2'>
                <h5 class="card-title">Active Sellers</h5>
                <div className='d-flex justify-content-end'>
                  <h1 className='mobile-card-text'>{noOfSeller}</h1>
                </div>
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
            data-target="#addCategoryModal"
          >
            <div className='d-flex flex-column'>
            <MdPlaylistAdd className='mx-auto' size={40}/>
            <small className='text-muted text-center mobile-admin-btn-text'>Add Category</small>
            </div>
          </div>
          <Link 
            className='col bg-light text-muted m-1 px-3 py-2 mobile-admin-btn'
            to='/admin/manage-categories'
          >
            <div className='d-flex flex-column'>
              <FaRegEdit className='mx-auto' size={40}/>
              <small className='text-muted text-center mobile-admin-btn-text'>Manage Categories</small>
            </div>
          </Link>
          <div
            className='col bg-light text-muted m-1 px-3 py-2 mobile-admin-btn' 
            data-toggle="modal" 
            data-target="#removeSellerModal"
          >
            <div className='d-flex flex-column'>
            <RiUserUnfollowLine className='mx-auto' size={40}/>
            <small className='text-muted text-center mobile-admin-btn-text'>Remove Seller</small>
            </div>
          </div>
          <div
            className='col bg-light text-muted m-1 px-3 py-2 mobile-admin-btn' 
            data-toggle="modal" 
            data-target="#addRestaurantModal"
          >
            <div className='d-flex flex-column'>
            <RiRestaurantLine className='mx-auto' size={40}/>
            <small className='text-muted text-center mobile-admin-btn-text'>Add Restaurant</small>
            </div>
          </div>
        </div> 
      </div>    
    </div>
  )
}

export default MobileAdminDashboard
