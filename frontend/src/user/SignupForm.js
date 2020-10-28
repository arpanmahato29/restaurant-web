import React from 'react'

const SignupForm = () => {
  return(
    <form>
      <div class="form-group">
        <label className='pl-3' for="Name">Name</label>
        <input type="text" class="form-control rounded-pill" id="Name" required />
      </div>
      <div class="form-group">
        <label className='pl-3' for="Email">Email</label>
        <input type="email" class="form-control rounded-pill" id="Email1" aria-describedby="emailHelp" required/>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label className='pl-3' for="Phone">Phone</label>
        <input type="tel" class="form-control rounded-pill" id="Phone" aria-describedby="phoneHelp" required />
        <small id="phoneHelp" class="form-text text-muted">We'll never share your phone number with anyone else.</small>
      </div>
      <div class="form-group">
        <label className='pl-3' for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control rounded-pill" id="exampleInputPassword1" />
      </div>
      <button type="button" class="rounded-pill btn btn-warning btn-block " data-dismiss="modal">Signup</button>
    </form>
  )
}

export default SignupForm
