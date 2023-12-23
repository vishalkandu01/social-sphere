import React from 'react'
import './Navbar.scss'
import Avatar from '../avatar/Avatar'
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();

  return (
    <div className='Navbar'>
        <div className="container">
            <h2 className="banner hover-link" onClick={() => navigate('/')}>Social Sphere</h2>
            <div className="right-side">
                <div className="profile hover-link" onClick={() => navigate('/profile/asdfl')}>
                    <Avatar />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar