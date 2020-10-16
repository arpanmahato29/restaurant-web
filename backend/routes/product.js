const express  = require('express');
const router = express.Router();

const {

} = require("../controllers/product");
const {
	isSignedIn,
	isAuthenticated,
	isSeller
} =  require('../controllers/authentication')
const {getUserById, getUser} = require('../controllers/user')

router.param("userId",getUserById);
router.param("productId", getUserById);

router.post('/product/create/:userId')