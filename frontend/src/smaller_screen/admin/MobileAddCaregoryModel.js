import React, { useState } from 'react'
import { createCategory } from '../../api_helpers/category';
import { isAuthenticated } from '../../auth/helper'


const MobileAddCaregoryModel = () => {

  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const {user,token} = isAuthenticated();
  const handleChange = event => {
    setName(event.target.value);
  }

  const handleSubmit = async event => {
    event.preventDefault();
    const data = await createCategory(user._id,token,{name})
    if(data.error){
      setError(data.error);
    } else {
      window.location.reload();
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
    <div className="modal fade" id="addCategoryModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog mobile-modal-placement">
        <div className="modal-content">
          <div className="modal-header bg-orange text-white">
            <h5 className="modal-title mobile-modal-header" id="exampleModalLabel">Add Category</h5>
          </div>
          <div className="modal-body">
            <form>
              {errorMessage()}
              <div className="form-group">
                <label htmlFor="categoryName ml-2">Category Name</label>
                <input type="text" className="form-control" id="categoryName" value={name} onChange={handleChange}/>
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

export default MobileAddCaregoryModel
