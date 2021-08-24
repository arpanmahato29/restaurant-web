import React, {  useState } from 'react'
import { searchUser, upgradeRole } from '../../api_helpers/user';
import { isAuthenticated } from '../../auth/helper'

function MobileAddSellerModal() {

  const [seller, setSeller] = useState({
    email:'',
  })
  const [error, setError] = useState(false)
  const {user,token} = isAuthenticated();
  const handleChange = event =>{
    setSeller({...seller,email:event.target.value});
  }

  const handleSubmit = async event => {
    event.preventDefault();
    const data = await searchUser(user._id,token,{email:seller.email});
    if(data.error ){
      setError(data.error);
    } else if(data.role !== 1){
      setError(`${data.email} is not a SELLER`)
    } else {
      let removeSeller = await upgradeRole(user._id,token,data._id,0)
      window.location.reload()
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
    <div className="modal fade" id="removeSellerModal" tabIndex="-1" >
      <div className="modal-dialog mobile-modal-placement">
        <div className="modal-content">
          <div className="modal-header bg-orange text-white">
            <h5 className="modal-title mobile-modal-header" id="exampleModalLabel">Remove Seller</h5>
          </div>
          <div className="modal-body">
            <form>
              {errorMessage()}
              <div class="form-group">
                <label for="exampleInputEmail1">Search Email</label>
                <input type="email" class="form-control" id="exampleInputEmail1" value={seller.email} onChange={handleChange}/>
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

export default MobileAddSellerModal
