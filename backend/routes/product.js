const express  = require('express');
const router = express.Router();

const {
	getProductById,
	createProduct,
	getProduct,
	photo,
	removeProduct,
	updateProduct,
	getAllProducts,
	getProductByCategory,
} = require("../controllers/product");
const {
	isSignedIn,
	isAuthenticated,
	isSeller,
	isAdmin
} =  require('../controllers/authentication')
const {getCategoryById} = require('../controllers/category')
const {getUserById} = require('../controllers/user')
const {getRestaurantById} = require('../controllers/restaurant')

router.param("userId",getUserById);
router.param("restaurantId",getRestaurantById);
router.param("categoryId",getCategoryById);
router.param("productId", getProductById);

router.post('/product/create/:restaurantId/:userId',
isSignedIn,isAuthenticated,isSeller,createProduct);

router.get('/product/:productId', getProduct);
router.get('/product/photo/:productId', photo);

router.delete('/product/:productId/:userId',
isSignedIn,isAuthenticated,isSeller,removeProduct);

router.put('/product/:productId/:userId',
isSignedIn,isAuthenticated,isSeller,updateProduct);

router.get('/restaurant/products/:restaurantId', getAllProducts);

router.post('/category/products',
getProductByCategory);

module.exports = router;