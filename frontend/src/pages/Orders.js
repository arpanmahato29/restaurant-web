import React, { useEffect, useState } from 'react'
import MobileUserOrder from '../smaller_screen/user/MobileUserOrder'
import MobileNavbar from '../smaller_screen/core/MobileNavbar'
import {getUserAllOrder} from '../api_helpers/orders'
import {isAuthenticated} from '../auth/helper/index'
const Orders = () => {

  const [orders, setOreders] = useState([]);
  const {user,token} = isAuthenticated(); 
  useEffect(async () => {
    const data = await getUserAllOrder(user._id,token);
    console.log(data);
  },[])

  if(window.innerWidth > 720){
    return(
      <div className='container'>

      </div>
    )
  } else {
    return(
      <div className='container-s'>
        <MobileUserOrder />
        <div className='mobile-navbar-controller mobile-border-top'>
          <MobileNavbar />
        </div>
      </div>
    )
  }
}

export default Orders
