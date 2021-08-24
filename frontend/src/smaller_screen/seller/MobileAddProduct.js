import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { getAllCategories } from '../../api_helpers/category'
import { createProduct } from '../../api_helpers/product'
import { getSellerRestaurant } from '../../api_helpers/restaurant'
import { isAuthenticated } from '../../auth/helper'
const MobileAddProduct = () => {

  const [product,setProduct] = useState({
    name:'',
    description:'',
    price:'',
    owner:'',
    photo:'',
    category:'',
    restaurant:'',
    formData:''
  })

  const [categories,setCategories] = useState([]);
  const [restaurants,setRestaturants] = useState([]);
  const [error,setError] = useState(false)
  const [success, setSuccess] = useState(false);
  const {name,description,price,formData} = product

  const {user,token} = isAuthenticated();

  useEffect(() => {
    async function fetchCategories(){
      const cate = await getAllCategories();
      if(cate.error){
        setError(cate.error);
      }else {
        setCategories(cate)
      }
    }
    async function fetchRestaurants(){
      const tempRestaurant = await getSellerRestaurant(user._id,token);
      if(tempRestaurant.error){
        setError(tempRestaurant.error)
      } else {
        setRestaturants(tempRestaurant);
      }
    }

    function loadFormData(){
      setProduct({...product,formData:new FormData()})
    }

    fetchCategories();
    fetchRestaurants();
    loadFormData();
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
        setSuccess(false)
        return;
    }
    if(product.photo === ''){
      setError('Please upload an image')
      return
    }
  
    const data = await createProduct(user._id,token,product.restaurant,formData)
    if(data.error ){
      setError(data.error);
      setSuccess(false)
    } else {
      setSuccess(true)
      setError(false)
      setProduct({...product,
        name:'',
        description:'',
        price:'',
        owner:'',
        photo:'',
        category:'',
        restaurant:'',
        formData: new FormData()
      })
    }
  }

  const errorMessage = () => {
    if(error && !success){
      return (
        <div className='alert alert-danger'>
          {error}
        </div>
      )
    }
  }

  const successMessage = () => {
    if(success && !error){
      return (
        <div className='alert alert-success'>
          Product Added Successfully
        </div>
      )
    }
  }

  return (
    <div>
      {errorMessage()}
      {successMessage()}
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
          <textarea
            onChange={handleChange("description")}
            name="photo"
            className="form-control"
            placeholder="Description"
            value={description}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("price")}
            type=""
            className="form-control"
            placeholder="Price"
            value={price}
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="categorySelector">Category</label>
          </div>
          <select 
            class="custom-select" 
            id="categorySelector"
            onChange={handleChange("category")}
            placeholder="Category"
          >
            <option >Select</option>
            {categories &&
              categories.map((category,index) => {
                return(
                  <option key={index} value={category._id}>{category.name}</option>
                )
              })
            }
          </select>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="categorySelector">Restaurant</label>
          </div>
          <select 
            class="custom-select" 
            id="categorySelector"
            onChange={handleChange("restaurant")}
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
        </div>
        
        <button type="submit" onClick={handleSubmit} className="btn btn-block btn-danger">
          Create Product
        </button>
      </form>
    </div>
  )
}

export default MobileAddProduct
