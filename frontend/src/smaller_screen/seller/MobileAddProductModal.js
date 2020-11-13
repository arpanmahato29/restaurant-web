import React, { useState } from 'react'
import {cover} from '../../images/cover.jpg'
const MobileAddProductModal = () => {

  const [product,setProduct] = useState({
    name:'',
    
  })

  const handleChange = value => event => {

  }

  const handleSubmit = event => {
    event.preventDefault();
  }

  return (
    <div className="modal fade" id="addProductModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog mobile-modal-placement">
        <div className="modal-content">
          <div className="modal-header bg-orange text-white">
            <form>
              <div className='form-group'>
                <img src={cover} />
                <label className='btn btn-light'>
                  <input 
                    onChange={handleChange('photo')}
                    type='file'
                    name='photo'
                    accept='image'
                    placeholder='Upload Image' 
                  />
                </label>
              </div>
            </form>
          </div>
          <div className="modal-body">
            <form>
              {errorMessage()}
              <div className="form-group">
                <input
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
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={price}
                />
              </div>
              <div className="form-group">
                <select
                  onChange={handleChange("category")}
                  className="form-control"
                  placeholder="Category"
                >
                  <option>Select</option>
                  <option value="a">a</option>
                  <option value="b">b</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  onChange={handleChange("quantity")}
                  type="number"
                  className="form-control"
                  placeholder="Quantity"
                  value={stock}
                />
              </div>
              
              <button type="submit" onClick={onSubmit} className="btn btn-outline-success">
                Create Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileAddProductModal
