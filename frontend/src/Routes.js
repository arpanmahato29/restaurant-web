import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from 'react-router-dom';
import Home from './pages/Home';
import ProtectedRoute from './auth/helper/ProtectedRoute';
import Restaurant from './pages/Restaurant';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Address from './pages/Address';
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <ProtectedRoute path='/restaurant' exact component={Restaurant} />
        <ProtectedRoute path='/account' exact component={Profile} />
        <ProtectedRoute path='/user/orders' exact component={Orders} />
        <ProtectedRoute path='/user/address' exact component={Address} />
      </Switch>
    </Router>
  )
}

export default Routes ;