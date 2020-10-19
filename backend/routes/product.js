const express  = require('express');
const router = express.Router();

const {
	getProductById,
	createProduct,
	getProduct,
	photo,
	removeProduct,
} = require("../controllers/product");
const {
	isSignedIn,
	isAuthenticated,
	isSeller,
	isAdmin
} =  require('../controllers/authentication')
const {getUserById, getUser} = require('../controllers/user')

router.param("userId",getUserById);
router.param("productId", getUserById);

router.post('/product/create/:userId',
isSignedIn,isAuthenticated,isAdmin,createProduct);

router.get('/product/:productId', getProduct);
router.get('/product/photo/:productId', photo);

router.delete('/product/:productId/:userId',
isSignedIn,isAuthenticated,isAdmin,removeProduct);

module.exports = router;