import React from 'react'

const LoginForm = () => {
  return(
    <form>
      <div class="form-group">
        <label className='pl-3' for="exampleInputEmail1">Email</label>
        <input type="email" class="form-control rounded-pill" id="exampleInputEmail1" aria-describedby="emailHelp" />
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label className='pl-3' for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control rounded-pill" id="exampleInputPassword1" />
      </div>
      <button type="button" class="rounded-pill btn btn-warning btn-block " data-dismiss="modal">Login</button>
    </form>
  )
}

export default LoginForm
