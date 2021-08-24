import React,{useEffect, useState} from 'react'
import {IoMdArrowRoundBack} from 'react-icons/io'
import { getProductByRestaurant } from '../api_helpers/product'
import MobileNavbar from '../smaller_screen/core/MobileNavbar'
import MobileProductCard from '../smaller_screen/core/MobileProductCard'

const Products = ({match}) => {

  const [products, setProducts] = useState([]);
  const [restaurant, setRestaurant] = useState('');
  const [error,setError] = useState(false);

  useEffect(() => {
    async function fetchProducts(){
      const data = await getProductByRestaurant(match.params.restaurantId);
      if(data.error){
        setError(data.error);
      } else {
        if(data.length === 0){
          setError('Sorry, We are closed at this moment..')
          return
        }
        setRestaurant(data[0].restaurant.name);
        setProducts(data);
      }
    }
    fetchProducts()
  }, [])

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
          <h3 className='pl-5 ml-2'>{restaurant}</h3>
        </div>
        <div className='container-s' style={{overflowY:'scroll', height:'75vh'}}>
          {products.length > 0 ?
            products.map((product,index) => (
              <MobileProductCard product={product} key={index} from='restaurant' />
            )) : (
              <div className='d-flex flex-column justify-content-center' style={{marginTop:'30vh'}}>
                <h3 className='text-muted'>{error}</h3>
              </div>
            )
          }
        </div>
        <div className='mobile-navbar-controller mobile-border-top'>
          <MobileNavbar />
        </div>
      </div>
    )
  }
}

export default Products
