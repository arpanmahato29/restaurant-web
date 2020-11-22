import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from 'react-router-dom';
import Home from './pages/Home';
import ProtectedRoute from './auth/helper/ProtectedRoute';
import SellerRoute from './auth/helper/SellerRoute';
import AdminRoute from './auth/helper/AdminRoute';
import Restaurant from './pages/Restaurant';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Address from './pages/Address';
import AddProduct from './pages/AddProduct';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ManageCategories from './pages/ManageCategories';
import ManageProducts from './pages/ManageProducts';
import UpdateProduct from './pages/UpdateProduct';
import Products from './pages/Products';
import Cart from './pages/Cart';
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <ProtectedRoute path='/restaurant' exact component={Restaurant} />
        <ProtectedRoute path='/restaurant/:restaurantId' exact component={Products} />
        <ProtectedRoute path='/account' exact component={Profile} />
        <ProtectedRoute path='/user/orders' exact component={Orders} />
        <ProtectedRoute path='/user/address' exact component={Address} />
        <ProtectedRoute path='/cart' exact component={Cart} />

        <SellerRoute path='/seller-dashboard' exact component={SellerDashboard} />
        <SellerRoute path='/seller-dashboard/add-product' exact component={AddProduct} />
        <SellerRoute path='/seller-dashboard/manage-products' exact component={ManageProducts} />
        <SellerRoute path='/seller-dashboard/manage-products/update-product/:productId' exact component={UpdateProduct} />

        <AdminRoute path='/admin-dashboard' exact component={AdminDashboard} />
        <AdminRoute path='/admin/manage-categories' exact component={ManageCategories} />
      </Switch>
    </Router>
  )
}

export default Routes ;