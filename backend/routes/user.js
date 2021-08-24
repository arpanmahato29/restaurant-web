const express = require('express');
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  removeUser,
  userPurchaseList,
  updateUserPicture,
  getUserAddress,
  countUsers,
  searchUser,
  upgradeToSeller
} = require('../controllers/user');
const {isSignedIn,isAuthenticated,isSeller,isAdmin, signout} = require('../controllers/authentication');

router.param('userId',getUserById);

router.get('/user/:userId',isSignedIn,isAuthenticated,getUser);

router.put('/user/:userId',isSignedIn,isAuthenticated,updateUser);

router.delete('/user/:userId',isSignedIn,isAuthenticated,removeUser,signout);

router.get('/user/orders/:userId',
isSignedIn,isAuthenticated,userPurchaseList);

router.get('/user/address/:userId',
isSignedIn,isAuthenticated,getUserAddress);
router.post('/user/count/:userId',
isSignedIn,isAuthenticated,isAdmin,countUsers);

router.post('/admin/search/:userId',
isSignedIn,isAuthenticated,isAdmin,searchUser)

router.put('/admin/upgrade-to-seller/:userId',
isSignedIn,isAuthenticated,isAdmin,upgradeToSeller)


module.exports = router;