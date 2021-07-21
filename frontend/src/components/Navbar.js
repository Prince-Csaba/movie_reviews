import React from 'react'
import { Link, useHistory } from 'react-router-dom';

function Navbar({ setUser }) {

  let history = useHistory();

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jwt');

    history.push("/");

  };

  return (
    <nav className="nav">
      <Link to='/googleauth' className='google-button'>
        Login with Google
      </Link>
      <div>
        <Link to='/'>HOME</Link>
        <Link to='/review'>Movie Reviews</Link>
        <Link to='/' onClick={logout}>
          SIGN OUT
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
