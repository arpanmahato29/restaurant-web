const express = require('express');
const router = express.Router();

const {
  isSignedIn,
  isSeller,
  isAdmin,
  isAuthenticated
} = require('../controllers/authentication');
const {getUserById} = require('../controllers/user');
const {
  getRestaurantById,
  createRestaurant,
  getAllRestaurants,
  updateRestaurant,
  removeRestaurant,
  getSellerRestaurants
} = require('../controllers/restaurant')

router.param('userId', getUserById);
router.param('restaurantId', getRestaurantById);

router.post('/restaurant/create/:userId',
isSignedIn,isAuthenticated,isAdmin,createRestaurant);

router.get('/restaurants',getAllRestaurants);

router.put('/restaurant/:restaurantId/:userId',
isSignedIn,isAuthenticated,isAdmin,updateRestaurant);

router.delete('/restaurant/:restaurantId/:userId',
isSignedIn,isAuthenticated,isAdmin,removeRestaurant);

router.get('/restaurants/:userId',
isSignedIn,isAuthenticated,isSignedIn,getSellerRestaurants)
module.exports = router;