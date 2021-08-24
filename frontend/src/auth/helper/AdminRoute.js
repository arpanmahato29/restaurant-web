import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { isAuthenticated } from '.'

const AdminRoute = ({component:Component,...rest}) => {
  const userAuthenicated = isAuthenticated();
  const {user} = userAuthenicated;
  return (
    <Route
      {...rest}
      render={props =>
        userAuthenicated && user.role == 2  ? (
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

export default AdminRoute
