import React, { useEffect, useState } from 'react'
import { updateUser } from '../../api_helpers/user';
import { authenticate, isAuthenticated } from '../../auth/helper';
//TODO: work on profile pictures
function MobileEditProfileModal(props) {

  const [editUser, setEditUser] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    setEditUser(props.user)
  }, [])

  const {name,email,phone} = editUser;
  const {user,token} = isAuthenticated();

  const handleChange = value => event => {
    setEditUser({...editUser, [value]:event.target.value})
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const data = await updateUser(user._id,token,editUser);
    if(data.error){
      setError(data.error);
    } else {
      const jwt = {token,user:data};
      authenticate(jwt,()=>{
        window.location.href= '/account';
      })
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
    <div className="modal fade" id="editProfileModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog mobile-modal-placement">
        <div className="modal-content">
          <div className="modal-header bg-orange text-white">
            <h5 className="modal-title mobile-modal-header" id="exampleModalLabel">edit profile</h5>
          </div>
          <div className="modal-body">
          {errorMessage()}
          <form>
            <div className="form-group">
              <label
                className='pl-2 mobile-modal-body-label' 
                htmlFor="editName"
              >
                Name
              </label>
              <input 
                type="text" 
                className="form-control " 
                id="editName" 
                onChange={handleChange('name')}
                value={name}
              />
            </div>
            <div className="form-group">
              <label
                className='pl-2 mobile-modal-body-label' 
                htmlFor="editEmail"
              >
                Email
              </label>
              <input 
                type="email" 
                className="form-control " 
                id="editEmail" 
                aria-describedby="emailHelp"
                onChange={handleChange('email')}
                value={email}
              />
            </div>
            <div className="form-group">
              <label
                className='pl-2 mobile-modal-body-label' 
                htmlFor="signupPhone"
              >
                Phone
              </label>
              <input 
                type="tel" 
                className="form-control " 
                id="editPhone" 
                aria-describedby="phoneHelp"
                onChange={handleChange('phone')}
                value={phone}
              />
            </div>
            <div className='d-flex justify-content-end'>
              <button 
                className="btn btn-dark  px-3"
                data-dismiss='modal'
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-danger ml-2"
                onClick={handleSubmit}
              >
                Confirm
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileEditProfileModal
