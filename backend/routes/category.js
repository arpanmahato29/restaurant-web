const express = require('express');
const router = express.Router();

const {
  getCategoryById,
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  removeCategory
} = require('../controllers/category');
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
  isSeller
} = require('../controllers/authentication');
const { getUserById } = require('../controllers/user');

//params
router.param('userId',getUserById);
router.param('categoryId', getCategoryById);

router.post(
  '/category/create/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
)

router.get('/category/:categoryId', getCategory);
router.get('/categories', getAllCategories);

router.put('/category/:categoryId/:userId',
  isSignedIn,isAuthenticated,isAdmin, updateCategory);

router.delete('/category/:categoryId/:userId',
  isSignedIn,isAuthenticated,isAdmin, removeCategory);

module.exports = router;