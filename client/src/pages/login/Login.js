import React from 'react';
import './Login.scss'

function Login() {
  return <div className="Login">
    <div className="login-box">
        <h2 className="heading">Login</h2>
        <form>
            <label htmlFor="email">Eamil</label>
            <input type="email" className="email" id="email" />

            <label htmlFor="password">Password</label>
            <input type="password" className='password' id='password' />

            <input type="submit" className='submit' />
        </form>
        <p>Do not have an accout? Sign Up</p>
    </div>
  </div>
}

export default Login