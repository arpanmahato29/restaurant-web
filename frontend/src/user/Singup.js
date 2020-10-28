import React from 'react'
import SignupForm from './SignupForm'

function Signup() {

  return (
    <div class="modal modal-signup" id='signup' tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header modal-no-border bg-orange">
            <h3 class="modal-title brand">SIGN UP</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <SignupForm/>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Signup
