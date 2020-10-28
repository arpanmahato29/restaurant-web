import React from 'react'
import LoginForm from './LoginForm'

function Signin() {

  return (
    <div class="modal modal-login" id='login' tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header modal-no-border bg-orange">
            <h3 class="modal-title brand">LOGIN</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Signin
