import React from 'react'
import Header from './Header';
import Footer from './Footer';
import Signin from '../user/Signin';
import Signup from '../user/Singup';
function Base() {
  return (
    <div>
      <Header />
      <Signin />
      <Signup />
      <Footer />
    </div>
  )
}

export default Base
