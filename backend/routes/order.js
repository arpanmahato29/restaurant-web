const express = require('express');
const router = express.Router();

const {
  getUserById,
  pushIntoUserOrderList
} = require('../controllers/user');
const {
  isSignedIn,
  isAuthenticated,
  isSeller,
  isAdmin
} = require('../controllers/authentication');
const {updateStock} = require('../controllers/product');
const {
  getOrderById, createOrder, updateStatus, searchOrder, getAllOrdersForRestaurant
} = require('../controllers/order');

//params
router.param('userId',getUserById);
router.param('orderId',getOrderById);

router.post(
  '/order/create/:userId',
  isSignedIn,
  isAuthenticated,
  createOrder,
  updateStock,
  pushIntoUserOrderList
);

router.put(
  '/order/:orderId/status/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
)

router.get(
  '/searchOrder/:orderId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  searchOrder
)

router.get(
  '/orders/:restaurantId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrdersForRestaurant
)

module.exports = router;
