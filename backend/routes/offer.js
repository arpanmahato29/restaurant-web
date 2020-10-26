const express = require('express');
const router = express.Router();

const {getUserById} = require('../controllers/user');
const {
  isAdmin,
  isAuthenticated,
  isSignedIn
} = require('../controllers/authentication');
const {
  getOfferById,
  createOffer,
  getAllOffers,
  updateOffer,
  removeOffer,

} = require('../controllers/offer');

//params
router.param('userId',getUserById);
router.param('offerId',getOfferById);

router.post(
  '/offer/create/:userId',
  isSignedIn,isAuthenticated,isAdmin,createOffer
)

router.get(
  '/offers/:userId', isSignedIn, isAuthenticated, getAllOffers
)

router.put(
  '/offer/:offerId/:userId',
  isSignedIn,isAuthenticated,isAdmin,updateOffer
)

router.delete(
  '/offer/:offerId/:userId',
  isSignedIn,isAuthenticated,isAdmin,removeOffer
)

module.exports = router;