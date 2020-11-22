import React, { useState } from 'react'
import {API} from '../../backend'
import { Link } from 'react-router-dom';
import { deleteProduct} from '../../api_helpers/product';
import { isAuthenticated } from '../../auth/helper';
import { addItemToCart } from '../../auth/helper/cartHelper';


const MobileProductCard = ({product,from}) => {

  const [error,setError] = useState(false);
  const [didproductAdded, setDidProductAdded] = useState(false);
  const {user,token} = isAuthenticated();

  const handleAddToCart = event => {
    event.preventDefault();
    addItemToCart(product,() => setDidProductAdded(true))
  }

  const handleDelete = async event => {
    event.preventDefault();
    const data = await deleteProduct(user._id,token,product._id);
    if(data.error){
      setError(data.error);
    } else {
      setError(false);
      window.location.reload();
    }
  }

  const ProductAddedSuccessfully = () => {
    return(
      didproductAdded &&
      <div>
        <small className='text-success'>Added to Cart</small>
      </div>
    )
  }

  return (
    <div class="card">
      <div class="card-body mobile-restaurant-card-body">
        <div className='row'>
          <div className='col-3'>
            <img
              src={`${API}/product/photo/${product._id}`}
              alt='image'
              style={{width:'70px', height:'70px'}}
              className=''
            />
          </div>
          <div className='col-6 px-1'>
            <p class="card-text mb-1">{product.name.toUpperCase()}</p>
            <small class="card-text mb-1 text-muted">{product.category.name}</small>
            {ProductAddedSuccessfully()}
            <p class="card-text text-muted">Price: Rs {product.price}</p>
          </div>
          { from === 'manageProduct' &&
            <div className='col-3'>
              <Link className='row' to={`/seller-dashboard/manage-products/update-product/${product._id}`}> 
                <button className='btn btn-success  btn-sm px-3 mb-2 text-bold'>
                  EDIT
                </button>
              </Link>
              <div className='row'>
                <button className='btn btn-danger btn-sm text-bold' onClick={handleDelete}>
                  REMOVE
                </button>
              </div>
            </div>
          }
          { from === 'restaurant' &&
            <div className='col-3 d-flex flex-column justify-content-center '>
              <div className=''>
                <button className='btn btn-success text-bold' onClick={handleAddToCart}>
                  ADD
                </button>
              </div>
            </div>
          }
          { from === 'productCart' &&
            <div className='col-3'>
              <div className='col-3 d-flex flex-column justify-content-center '>
                <div className=''>
                  <button className='btn btn-danger text-bold' onClick={handleDelete}>
                    REMOVE
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default MobileProductCard
