import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { getProduct, updateProduct } from '../../api_helpers/product'
import { isAuthenticated } from '../../auth/helper'
const MobileUpdateProduct = ({match}) => {

  const [product,setProduct] = useState({
    name:'',
    description:'',
    price:'',
    owner:'',
    photo:'',
    formData:''
  })


  const [error,setError] = useState(false)
  const {name,description,price,formData} = product

  const {user,token} = isAuthenticated();

  useEffect(() => {

    async function fetchProduct(productId) {
      const data = await getProduct(productId);
      if(data.error){
        setError(data.error);
      } else {
        setProduct({...product,
          name:data.name,
          description:data.description,
          price:data.price,
          formData: new FormData()
        })
      }
    }

    fetchProduct(match.params.productId);
  },[])

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name,value)
    setProduct({...product,[name]:value})

  }

  const handleSubmit = async event => {
    event.preventDefault();
    setError(false);
    if(!(name &&
      description &&
      price  )){
        setError('Please fill all the fields')
        return;
    }
    const data = await updateProduct(user._id,token,match.params.productId,formData);
    if(data.error){
      setError(data.error);
    } else {
      window.location.href = '/seller-dashboard/manage-products'
    }
  }

  const handleCancel = event => {
    event.preventDefault();
    window.location.href = '/seller-dashboard/manage-products';
  }

  const errorMessage = () => {
    if(error){
      return (
        <div className='alert alert-danger'>
          {error}
        </div>
      )
    }
  }

  return (
    <div>
      {errorMessage()}
      <form>
        <div className='form-group'>
          <label className='mt-2 d-flex justify-content-center mx-2'>
            <input
              className='btn btn-danger ' 
              onChange={handleChange('photo')}
              type='file'
              name='photo'
              accept='image'
              placeholder='Upload Image' 
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor='productName'>Name</label>
          <input
            id='productName'
            onChange={handleChange("name")}
            name="photo"
            className="form-control"
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="form-group">
          <label htmlFor='productDescription'>Description</label>
          <textarea
            id='productDescription'
            onChange={handleChange("description")}
            name="photo"
            className="form-control"
            placeholder="Description"
            value={description}
          />
        </div>
        <div className="form-group">
          <label htmlFor='productPrice'>Price</label>
          <input
            id='productPrice'
            onChange={handleChange("price")}
            type=""
            className="form-control"
            placeholder="Price"
            value={price}
          />
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-block btn-danger">
          Update Product
        </button>
        <button type="submit" onClick={handleCancel} className="btn btn-block btn-dark">
          Cancel
        </button>
      </form>
    </div>
  )
}

export default MobileUpdateProduct
