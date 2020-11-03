import React from 'react'
import {FaPizzaSlice, FaRegUser} from 'react-icons/fa'
import {RiSearch2Line , RiShoppingCartLine} from 'react-icons/ri'
import { Link, withRouter } from 'react-router-dom'

const currentTab = (history,path) => {
  if(history.location.pathname === path){
    return { color: '#ff9f43'}
  } else {
    return {color: 'grey'}
  }
}

const MobileNavbar = ({history}) => {
  return (
    <div className='navbar navbar-light bg-dark mobile-navbar '>
      <ul className='navbar-nav d-flex flex-row'>
        <li className='nav-item mobile-nav-item text-center '>
          <Link 
            className='d-flex flex-column px-2' 
            to='/restaurant'
            style={currentTab(history,'/restaurant')}
            >
            <span className='brand'>F<FaPizzaSlice size={10}/></span>
            <small className='mobile-nav-text'>FOODIES</small>
          </Link>
        </li>
        <li className='nav-item mobile-nav-item text-center'>
          <Link 
            className='d-flex flex-column px-2'
            to='/search'
            style={currentTab(history,'/search')}
          >
            <span className=''><RiSearch2Line /></span>
            <small className='mobile-nav-text'>SEARCH</small>
          </Link>
        </li>
        <li className='nav-item mobile-nav-item text-center'>
          <Link 
            className='d-flex flex-column px-2 '
            to='/cart'
            style={currentTab(history,'/cart')}
          >
            <span className=''><RiShoppingCartLine /></span>
            <small className=' mobile-nav-text'>CART</small>
          </Link>
        </li>
        <li className='nav-item mobile-nav-item text-center'>
          <Link 
            className='d-flex flex-column px-2'
            to='/account'
            style={currentTab(history,'/account')}
          >
            <span className=''><FaRegUser /></span>
            <small className=' mobile-nav-text'>ACCOUNT</small>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(MobileNavbar)
