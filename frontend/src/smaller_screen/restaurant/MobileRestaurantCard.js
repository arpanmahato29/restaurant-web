import React from 'react'
import cover from '../../images/cover.jpg'
const MobileRestaurantCard = ({restaurant}) => {
  return (
    <div class="card">
      <div class="card-body mobile-restaurant-card-body">
        <div className='row'>
          <div className='col-3'>
            <img src={cover} style={{width:'70px'}}/>
          </div>
          <div className='col-9'>
            <p class="card-text mb-1">{restaurant.name.toUpperCase()}</p>
            <p class="card-text text-muted">{restaurant.address}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileRestaurantCard
