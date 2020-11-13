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
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ManageCategories from './pages/ManageCategories';
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <ProtectedRoute path='/restaurant' exact component={Restaurant} />
        <ProtectedRoute path='/account' exact component={Profile} />
        <ProtectedRoute path='/user/orders' exact component={Orders} />
        <ProtectedRoute path='/user/address' exact component={Address} />

        <SellerRoute path='/seller-dashboard' exact component={SellerDashboard} />

        <AdminRoute path='/admin-dashboard' exact component={AdminDashboard} />
        <AdminRoute path='/admin/manage-categories' exact component={ManageCategories} />
      </Switch>
    </Router>
  )
}

export default Routes ;