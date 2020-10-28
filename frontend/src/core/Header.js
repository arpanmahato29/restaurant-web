import React, { Fragment } from 'react'
import '../styles/header.css'
import {FaPizzaSlice} from 'react-icons/fa'
import {isAuthenticated} from '../auth/helper'
function Header() {
  return (
    <div className='container-s'>
      <nav className="navbar navbar-dark bg-orange">
        <div>
          <a className="navbar-brand" href="#">
            <span className='header-font brand'>FOODIES</span>
            <FaPizzaSlice />
          </a>
        </div>
        <div>
          <ul className='nav login-header text-white'>
            { !isAuthenticated() &&
              <Fragment>
                <li className='nav-item '>
                  <button className='btn text-white' data-toggle='modal' data-target='#login'>Login</button>
                </li>
                <li className='nav-item'>
                  <button className='btn text-white' data-toggle='modal' data-target='#signup'>Sign up</button>
                </li>
              </Fragment>
            }
            { isAuthenticated() &&
              <li className='nav-item'>
                signout
              </li>
            }
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header
