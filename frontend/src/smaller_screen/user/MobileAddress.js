import React, { useState, useEffect } from 'react'
import {RiMoreFill} from 'react-icons/ri'
import { userAddress,updateUser } from '../../api_helpers/user';
import { isAuthenticated } from '../../auth/helper';

const MobileAddress = () => {

  const {user,token} = isAuthenticated();
  const [address, setAddress] = useState([]);
  const [oldAddress, setOldAddress] = useState({})
  const [selectedAdd, setSelectedAdd] = useState({
    address:'',
    floor:'',
    how_to_reach:'',
    type:'Home'
  });
  const [error, setError] = useState(false);
  useEffect(() => {
    async function fetchData(){
      const data = await userAddress(user._id,token);
      setAddress(data);
    }
    fetchData();
  },[])

  const handleConfirm = async event => {
    event.preventDefault();
    if(selectedAdd){
      let isSame = false;
      for(let i = 0; i < address.length; i++){
        if(address[i].address === selectedAdd.address){
          isSame=true;
          break;
        }
      }
      if(isSame){
        setError(true);
      }else {
        if(oldAddress){
          let newAddress = address.filter(add => add.address != oldAddress.address);
          newAddress.push(selectedAdd);
          const data = await updateUser(user._id,token,{address:newAddress})  
        }else{
          const newAdd = [...address,selectedAdd]
          const data = await updateUser(user._id,token,{address:newAdd})
        }
        window.location.reload();
      }
    }
  }

  const handleChange = value => event =>{
    setSelectedAdd({...selectedAdd, [value]:event.target.value})
  }

  const handleDelete = async event => {
    event.preventDefault();
    let newAddress = address.filter(add => add != selectedAdd);
    await updateUser(user._id,token,{address:newAddress});
    window.location.reload();
  }

  const FailedToAddAddress = () => {
    if(error){
      return (
        <div className='alert alert-danger '>
          Error!! Cannot add the address
        </div>
      )
    }
  }


  const editModal = () => (
    <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog mobile-modal-placement">
        <div className="modal-content">
          <div className="modal-header bg-orange text-white">
            <h5 className="modal-title mobile-modal-header" id="exampleModalLabel">Address Details</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {FailedToAddAddress()}
            <form>
              <div className="form-group">
                <small htmlFor="complete-address" className='text-muted'>Complete Address</small>
                <input className="form-control" id="complete-address" required value={selectedAdd.address}  onChange={handleChange('address')}/>
              </div>
              <div className="form-group">
                <input className="form-control " placeholder='Floor (Optional)' value={selectedAdd.floor} onChange={handleChange('floor')} />
              </div>
              <div className="form-group">
                <input className="form-control" placeholder='How to Reach (Optional)' value={selectedAdd.how_to_reach} onChange={handleChange('how_to_reach')}/>
              </div>
              <div className="input-group mb-3">
                <select className="custom-select mobile-address-custom-select" id="addressCategory" onChange={handleChange('type')}>
                  <option defaultValue value='Home'>Home</option>
                  <option value='Work'>Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </form>
            <div className='d-flex justify-content-end'>
              <button className='btn btn-dark ' data-dismiss='modal'>Cancel</button>
              <button className='btn btn-danger ml-2' onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const deleteModal = () => {
    return(
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog mobile-modal-placement">
          <div className="modal-content mobile-delete-modal">
            <div className="modal-body">
              <p className='text-muted'>Are you sure you want to delete this address</p>
              <div className='d-flex justify-content-end'>
                <button className='btn btn-dark btn-sm px-3' data-dismiss='modal'>NO</button>
                <button className='btn btn-danger btn-sm ml-2 px-3' data-dismiss='modal' onClick={handleDelete}>YES</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div>
      {editModal()}
      {deleteModal()}
      {address.length != 0 ? address.map((userAddress,index) =>{
        return (
          <div className="card mobile-address-card container" key={index}>
            <div className="card-body mobile-address-card-body d-flex justify-content-between">
              <div className='container-s d-flex flex-column'>
                <small className='text-orange mobile-address-type'>{userAddress.type}</small>
                <small className="card-text">{userAddress.address}</small>
              </div>
              <div className="nav-item">
                <a className="nav-link" href="#" id="address" role="adress-more" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <RiMoreFill className='mt-2 text-dark'/>
                </a>
                <div className="dropdown-menu" aria-labelledby="address-more">
                  <a className="dropdown-item" 
                    href="#" data-toggle="modal" 
                    data-target="#editModal" 
                    onClick={() => {
                      setSelectedAdd(userAddress)
                      setOldAddress(userAddress)
                    }}
                  >
                    Edit
                  </a>
                  <a className="dropdown-item" href="#" data-toggle="modal" data-target="#deleteModal" onClick={() => setSelectedAdd(userAddress)}>Delete</a>
                </div>
              </div>
            </div>
          </div>
        )
      }
      )
      :
      (
        <div className='container mobile-no-address'>
          <h5 className='text-muted text-center'> Please Provide Address To Enjoy Delicious Food At your Doorstep</h5>
        </div>
      )
      }
      <div className='container-s mobile-logout-button px-5'>
          <a className='btn btn-danger btn-block mt-3' data-toggle="modal" data-target="#editModal">ADD</a>
      </div>
    </div>
  )
}

export default MobileAddress
