
const Restuarant = require('../models/restaurant');

exports.getRestaurantById = (req,res,next,id) => {
  Restuarant.findById(id)
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
  const restaurant = new Restuarant(req.body);
  restaurant.save((error, restaurant) => {
    if(error){
      return res.status(400).json({
        error: 'UNABLE TO SAVE RESTAURANT'
      });
    }
    res.json({restaurant});
  })
}

exports.getAllRestaurants = (req,res) => {

  Restuarant.find()
  .exec((error, restaurants) => {
    if(error){
      return res.status(400).json({
        error : 'NO RESTAURANTS FOUND'
      });
    }
    res.json(restaurants);
  })
}

exports.updateRestaurant = (req,res) => {

  Restuarant.findByIdAndUpdate(
    {_id: req.restaurant._id},
    {name: req.body.name},
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
  Restuarant.findOneAndRemove(
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