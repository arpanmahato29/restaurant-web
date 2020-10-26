const express = require('express');
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  removeUser,
  userPurchaseList
} = require('../controllers/user');
const {isSignedIn,isAuthenticated,isSeller,isAdmin, signout} = require('../controllers/authentication');

router.param('userId',getUserById);

router.get('/user/:userId',isSignedIn,isAuthenticated,getUser);

router.put('/user/:userId',isSignedIn,isAuthenticated,updateUser);

router.delete('/user/:userId',isSignedIn,isAuthenticated,removeUser,signout);

router.get('/user/orders/:userId',
isSignedIn,isAuthenticated,userPurchaseList);

module.exports = router;