import React from 'react'
import {Link} from 'react-router-dom'
import cover from '../../images/cover.jpg'
const MobileRestaurantCard = ({restaurant}) => {
  return (
    <Link className="card text-dark" to={`/restaurant/${restaurant._id}`}>
      <div className="card-body mobile-restaurant-card-body">
        <div className='row'>
          <div className='col-3'>
            <img src={cover} style={{width:'70px'}}/>
          </div>
          <div className='col-9'>
            <p className="card-text mb-1">{restaurant.name.toUpperCase()}</p>
            <p className="card-text text-muted">{restaurant.address}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MobileRestaurantCard
