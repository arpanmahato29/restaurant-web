import React,{useState,useEffect} from 'react'
import {RiMoreFill} from 'react-icons/ri'
import {deleteCategory, getAllCategories, updateCategory} from '../../api_helpers/category'
import { isAuthenticated } from '../../auth/helper';
function MobileManageCategories() {
  
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [error, setError] = useState(false);
  const {user,token} = isAuthenticated();
  useEffect(() => {
    async function fetchData(){
      const data = await getAllCategories();
      setCategories(data);
    }
    fetchData();
  },[])

  const handleConfirm = async event => {
    event.preventDefault();
    const data = await updateCategory(user._id,token,selectedCategory._id,{name:selectedCategory.name});
    if(data.error){
      setError(data.error);
    } else {
      window.location.reload();
    }
  }

  const handleChange = event =>{
    setSelectedCategory({...selectedCategory,name:event.target.value});
  }

  const handleDelete = async event => {
    event.preventDefault();
    const data = await deleteCategory(user._id,token,{_id:selectedCategory._id})
    if(data.error){
      setError(data.error);
    } else {
      window.location.reload();
    }
  }

  const errorMessage = () => {
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
            <h5 className="modal-title mobile-modal-header" id="exampleModalLabel">Edit Category</h5>
          </div>
          <div className="modal-body">
            {errorMessage()}
            <form>
              <div className="form-group">
                <small htmlFor="complete-address" className='text-muted'>Category Name</small>
                <input className="form-control" id="complete-address" required value={selectedCategory.name}  onChange={handleChange}/>
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
              <p className='text-muted'>Are you sure you want to delete this category</p>
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
      {categories.length !== 0 ? 
        categories.map((category,index) =>{
          return (
            <div className="card mobile-address-card container" key={index}>
              <div className="card-body mobile-address-card-body d-flex justify-content-between">
                <div className='container-s d-flex align-middle'>
                  <span className="card-text mt-2">{category.name}</span>
                </div>
                <div className="nav-item">
                  <a className="nav-link" href="#" id="address" role="adress-more" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <RiMoreFill className='mt-2 text-dark'/>
                  </a>
                  <div className="dropdown-menu" aria-labelledby="address-more">
                    <a className="dropdown-item" 
                      href="#" data-toggle="modal" 
                      data-target="#editModal" 
                      onClick={() => setSelectedCategory(category)}
                    >
                      Edit
                    </a>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#deleteModal" onClick={() => setSelectedCategory(category)}>Delete</a>
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
            <h5 className='text-muted text-center'> No Categories Created</h5>
          </div>
        )
      }
    </div>
  )
}

export default MobileManageCategories
