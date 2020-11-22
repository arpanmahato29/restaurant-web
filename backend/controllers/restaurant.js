const _ =  require('lodash');
const Restaurant = require('../models/restaurant');

exports.getRestaurantById = (req,res,next,id) => {
  Restaurant.findById(id)
  .exec((error,restaurant) => {
    if(error){
      return res.status(400).json({
        error: 'NO SUCH RESTAURANT FOUND'
      });
    }
    req.restaurant = restaurant;
    next();
  })
}

exports.createRestaurant = (req,res) => {
  const restaurant = new Restaurant(req.body);
  restaurant.save((error, restaurant) => {
    if(error){
      return res.status(400).json({
        error: 'UNABLE TO SAVE RESTAURANT'
      });
    }
    res.json(restaurant);
  })
}

exports.getAllRestaurants = (req,res) => {

  Restaurant.find()
  .exec((error, restaurants) => {
    if(error){
      return res.status(400).json({
        error : 'NO RESTAURANTS FOUND'
      });
    }
    res.json(restaurants);
  })
}

exports.getSellerRestaurants = (req,res) => {
  Restaurant.find(
    {owner:req.profile._id}
  ).exec((error,restaurants) => {
    if(error || !restaurants){
      return res.status(400).json({
        error:'Cannot Fetch restaurants'
      })
    }
    res.json(restaurants);
  })
}

exports.updateRestaurant = (req,res) => {

  let restaurant = req.restaurant;
  restaurant = _.extend(restaurant,req.body);

  restaurant.save(
    (error,updatedRestaurant) => {
      if(error){
        return res.status(400).json({
          error: 'FAILED TO UPDATE RESTAURANT'
        });
      }
      res.json(updatedRestaurant);
    }
  )
  
}

exports.removeRestaurant = (req,res) => {
  Restaurant.findOneAndRemove(
    {_id: req.restaurant._id},
    (error,restaurant) => {
      if(error){
        return res.status(400).json({
          error: "CANNOT DELETE THIS RESTAURANT"
        });
      }
      res.json({
        msg: "RESTAURANT DELETED"
      })
  })
}