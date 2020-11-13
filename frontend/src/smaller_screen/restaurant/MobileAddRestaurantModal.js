import React, { useState } from 'react'
import { createRestaurant } from '../../api_helpers/restaurant';
import { searchUser, upgradeRole } from '../../api_helpers/user';
import { isAuthenticated } from '../../auth/helper';

function MobileAddRestaurantModal() {

  const [resturant, setRestaurant] = useState({
    name:'',
    owner:''
  })
  const [error,setError] = useState(false);
  const{user,token} = isAuthenticated();

  const handleChange = value => event => {
    setRestaurant({...resturant,[value]:event.target.value})
  }

  const handleSubmit = async event => {
    event.preventDefault();
    let userData = await searchUser(user._id,token,{email:resturant.owner})
    if(userData.erro){
      setError(userData.error);
    } else if (userData.role === 0){
      userData = await upgradeRole(user._id,token,userData._id,1);
    }
    if(userData.role > 0){
      let data = createRestaurant(user._id,token,userData._id,resturant.name);
      if(data.error){
        setError(data.error);
      } else {
        window.location.reload();
      }
    }
  }
 
  const errorMessage = () => {
    if(error){
      return(
        <div className='alert alert-danger'>
          {error}
        </div>
      )
    }
  }

  return (
    <div className="modal fade" id="addRestaurantModal" tabIndex="-1" >
      <div className="modal-dialog mobile-modal-placement">
        <div className="modal-content">
          <div className="modal-header bg-orange text-white">
            <h5 className="modal-title mobile-modal-header" id="exampleModalLabel">Add Restaurant</h5>
          </div>
          <div className="modal-body">
            <form>
              {errorMessage()}
              <div class="form-group">
                <label for="restaurantName">Restaurant Name</label>
                <input type="text" class="form-control" id="restaurantName" value={resturant.name}  onChange={handleChange('name')}/>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Owner Email</label>
                <input type="email" class="form-control" id="exampleInputEmail1" value={resturant.owner}  onChange={handleChange('owner')}/>
              </div>
              <div className='d-flex justify-content-end'>
                <button className='btn btn-dark px-2' data-dismiss='modal'>Cancel</button>
                <button className='btn btn-danger ml-2' onClick={handleSubmit}>Confirm</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileAddRestaurantModal
