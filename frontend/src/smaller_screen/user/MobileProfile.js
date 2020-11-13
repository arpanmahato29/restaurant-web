import React from 'react'
import { isAuthenticated } from '../../auth/helper'
import {Link} from 'react-router-dom'
import {RiUserSettingsFill, RiShoppingBag2Line, RiHomeHeartFill, RiShieldUserFill} from 'react-icons/ri'
import {FaMoneyCheckAlt} from 'react-icons/fa'
import MobileEditProfileModal from '../user/MobileEditProfileModal'
const MobileProfile = () => {

  let {name,phone,email} = isAuthenticated().user;
  name = name.toUpperCase();
  email = email.toLowerCase();
  const role = isAuthenticated().user.role;

  const handleUserProfile = event => {
    event.preventDefault();
  }

  const editProfile = () => {
    return(
      <MobileEditProfileModal 
        user={{name,email,phone}} 
      />
    )
  }

  return (
    <div className='container'>
      {editProfile()}
      <div className='profile-user-header text-center text-muted'>
        <p className='mobile-profile-username'>{name}</p>
        <span className='mobile-profile-email pr-2'>{email}</span>
        .
        <span className='mobile-profile-phone pl-2'>+91 {phone}</span>
      </div>
      <div className='col mobile-profile-main '>
        <Link className='row pb-1 text-muted' to='/user/orders'>
          <div className='mobile-profile-main-icon'>
            <RiShoppingBag2Line size={25}/>
          </div>
          <p>My Orders</p>
        </Link>
        <Link className='row pb-1 text-muted' to='/user/address'>
          <div className='mobile-profile-main-icon'>
            <RiHomeHeartFill size={25} />
          </div>
          <p>My Address Book</p>
        </Link>
        { role === 1 &&
          <Link className='row pb-1 text-muted' to='/seller-dashboard'>
            <div className='mobile-profile-main-icon'>
              <FaMoneyCheckAlt size={25}/>
            </div>
            <p>Seller Dashboard</p>
          </Link>
        }
        { role === 2 &&
          <Link className='row pb-1 text-muted' to='/admin-dashboard'>
            <div className='mobile-profile-main-icon'>
              <RiShieldUserFill size={25}/>
            </div>
            <p>Admin Dashboard</p>
          </Link>
        }
        <div className='row pb-1 text-muted' 
          onClick={handleUserProfile} 
          data-toggle="modal" 
          data-target="#editProfileModal"  
        >
          <div className='mobile-profile-main-icon'>
            <RiUserSettingsFill size={25}/>
          </div>
          <p>Edit Profile</p>
        </div>
      </div>
    </div>
  )
}

export default MobileProfile
