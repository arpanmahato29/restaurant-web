import React, { useEffect, useState } from 'react'
import { getRestaurants } from '../../api_helpers/restaurant';
import Restaurant from '../../pages/Restaurant';
import MobileRestaurantCard from './MobileRestaurantCard';

const MobileRestaurantMain = () => {

  const [restaurants, setRestaturants] = useState([]);

  useEffect(() => {
    async function fetchData(){
      const tempRestaurants = await getRestaurants();
      setRestaturants(tempRestaurants);
    }
    fetchData();
  }, [])

  return (
    <div>
      {
        restaurants.map((restaurant,index) => (
          <MobileRestaurantCard restaurant={restaurant} key={index}/>
        ))
      }
    </div>
  )
}

export default MobileRestaurantMain
