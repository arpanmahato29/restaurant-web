import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { isAuthenticated } from '.'

const SellerRoute = ({component:Component,...rest}) => {
  const userAuthenticated = isAuthenticated();
  const {user} = userAuthenticated;
  return (
    <Route
      {...rest}
      render={props =>
        userAuthenticated && user.role === 1 ? (
          <Component {...props}/>
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
  />
  );
}

export default SellerRoute
