import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="nav">
      <Link to='/googleauth' className='google-button'>
        Login with Google
      </Link>
      <div>
        <Link to='/'>HOME</Link>
      </div>
    </nav>
  )
}

export default Navbar
