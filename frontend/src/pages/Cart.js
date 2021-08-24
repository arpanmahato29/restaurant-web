import React, { Fragment, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { loadCart } from '../auth/helper/cartHelper';
import MobileNavbar from '../smaller_screen/core/MobileNavbar'
const Cart = () => {

  const [products,setProducts] = useState([]);
  const [restaurant, setRestaurant] = useState({});
  const [error, setError] = useState(false);


  useEffect(()=>{ 
    const cart = loadCart();
    if(cart === 'error'){
      setError(true)
    } else {
      console.log(cart[0].restaurant)
      setProducts(cart);
      setRestaurant(cart[0].restaurant)
    }
  },[])



  if(window.innerWidth > 720){
    return (
      <div>

      </div>
    )
  } else {

    const emptyCart = () => {
      if(products.length === 0 && error){
        return(
          <div className='container text-center text-muted ' style={{marginTop:'40vh'}}>
            <h4>GOOD FOOD IS ALWAYS COOKING</h4>
            <div>
              <small className='text-bold'> Your cart is empty</small>
            </div>
            <div className='mb-3'>
              <small className='text-bold'>Add something from the menu</small>
            </div>
            <Link className='btn btn-danger btn-sm text-bold' to={`/restaurant`}> 
              BROWSE RESTAURANTS
            </Link>
          </div>
        )
      }
    }

    return(
      <div className='container-s'>
        {emptyCart()}
        {!error &&
          <Fragment>
            <div className='container mobile-address-header d-flex justify-content-start my-4 text-muted'>
              <div className=''>
                <h3>{restaurant.name}</h3>
                <small>{restaurant.address}</small>
              </div>
            </div>
            <div className='container' style={{overflowY:'scroll', height:'70vh'}}>
              
            </div>
          </Fragment>
        }
        <div className='mobile-navbar-controller mobile-border-top'>
          <MobileNavbar />
        </div>
      </div>
    )
  }
}

export default Cart
