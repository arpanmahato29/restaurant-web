import React from 'react'
import MobileSignupForm from '../user/MobileSignupForm'

const MobileSignupModal = () =>  {
  return (
    <div className="modal fade" id="signupMobileModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog mobile-modal-placement">
        <div className="modal-content">
          <div className="modal-header bg-orange text-white">
            <h5 className="modal-title mobile-modal-header" id="exampleModalLabel">SIGN UP</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <MobileSignupForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileSignupModal
