import React from 'react'
import MobileLoginForm from '../user/MobileLoginForm'

const MobileLoginModal = () =>  {
  return (
    <div className="modal fade" id="loginMobileModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog mobile-modal-placement">
        <div className="modal-content">
          <div className="modal-header bg-orange text-white">
            <h5 className="modal-title mobile-modal-header" id="exampleModalLabel">LOGIN</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <MobileLoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileLoginModal
