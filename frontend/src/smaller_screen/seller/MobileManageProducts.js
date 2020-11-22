import React, { useState, useEffect } from 'react'
import {FaTrashAlt,FaRegEdit} from 'react-icons/fa'
import {FiEdit} from 'react-icons/fi'
import { getSellerRestaurant } from '../../api_helpers/restaurant'
import { getProductByRestaurant } from '../../api_helpers/product';
import { isAuthenticated } from '../../auth/helper';
import MobileProductCard from '../core/MobileProductCard';

const MobileManageProducts = () => {

  const [products, setProducts] = useState([]);
  const [restaurants,setRestaurants] = useState([]);
  const [restaurant,setRestaurant] = useState('');
  const [error, setError] = useState(false);

  const {user,token} = isAuthenticated();

  useEffect(() => {
    async function fetchRestaurants(){
      const tempRestaurant = await getSellerRestaurant(user._id,token);
      if(tempRestaurant.error){
        setError(tempRestaurant.error)
      } else {
        setRestaurants(tempRestaurant);
      }
    }
    fetchRestaurants();
  }, [])

  const handleChange = name => event =>{
    if(name === 'restaurant'){
      setRestaurant(event.target.value)
    }
  }

  const handleSelectClick = async event => {
    event.preventDefault();
    if(!restaurant){
      setError('No Restaurant Selected')
      return;
    }
    const data = await getProductByRestaurant(restaurant);
    if(data.error){
      setError(data.error);
    } else {
      setProducts(data);
      setError(false)
    }
  }

  const errorMessage = () => {
    if(error){
      return(
        <div className='alert alert-danger'>{error}</div>
      )
    }
  }

  return (
    <div>
      <div class="input-group mb-3">
        
        <select 
          class="custom-select" 
          id="categorySelector"
          onChange={handleChange('restaurant')}
          placeholder="restaurant"
        >
          <option >Select</option>
          {restaurants &&
            restaurants.map((restaurant,index) => {
              return(
                <option key={index} value={restaurant._id}>{restaurant.name}</option>
              )
            })
          }
        </select>
        <button className='btn btn-danger rounded-right' onClick={handleSelectClick}>Select Restaurant</button>
      </div>
      {error && errorMessage()}
      <div>
        {products &&
          products.map((product,index) => {
            return(<MobileProductCard product={product} key={index} from='manageProduct'/>)
          })
        }
      </div>

    </div>
  )
}

export default MobileManageProducts
