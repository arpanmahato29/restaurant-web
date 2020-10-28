import React from 'react'
import {FaCopyright} from 'react-icons/fa'
import '../styles/footer.css'
function Footer() {
  return (
    <div className='container-s bg-black text-white'>
      <div className='row'>
        <div className='col-sm-4'>
            <div className='mx-3 footer-heading color-grey'>COMPANY</div>
            <ul className='navbar-nav mx-5 footer-list'>
              <li className='nav-item'>
                <a className='nav-link text-white no-pd-mg' href='#'>About us</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link text-white no-pd-mg' href='#'>Team</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link text-white no-pd-mg' href='#'>Careers</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link text-white no-pd-mg' href='#'><span className='brand'>FOODIES</span> Super</a>
              </li>
            </ul>
        </div>
        <div className='col-sm-4'>
            <div className='mx-3 footer-heading color-grey'>CONTACT</div>
            <ul className='navbar-nav mx-5 footer-list'>
              <li className='nav-item'>
                <a className='nav-link text-white no-pd-mg' href='#'>Help & Support</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link text-white no-pd-mg' href='#'>Partner with us</a>
              </li>
            </ul>
        </div>
        <div className='col-sm-4'>
            <div className='mx-3 footer-heading color-grey'>LEGAL</div>
            <ul className='navbar-nav mx-5 footer-list'>
              <li className='nav-item'>
                <a className='nav-link text-white no-pd-mg' href='#'>Terms & Conditions</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link text-white no-pd-mg' href='#'>Refund & Cancellation</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link text-white no-pd-mg' href='#'>Privacy Policy</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link text-white no-pd-mg' href='#'>Cookie Policy</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link text-white no-pd-mg' href='#'>Offer Terms</a>
              </li>
            </ul>
        </div>
      </div>
      <div className='copyright text-center mt-4'>
        Copyright <FaCopyright/> 2020 <span className='brand'> FOODIES</span> .All Rights Reserved
      </div>
    </div>
  )
}

export default Footer
