import React,{useContext, useState, useRef, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';

function Navbar({ setUser }) {
  const user = useContext(UserContext);

  let history = useHistory();

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jwt');

    history.push("/");

  };

  //navbar color change on scroll
  const [navBackground, setNavBackground] = useState(false)
  const navRef = useRef()
  navRef.current = navBackground
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 120
      if (navRef.current !== show) {
        setNavBackground(show)
      }
    }
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className="nav" id={navBackground ? 'color' : 'transparent'}>
      {user ? (
        <>
          <Link to='/'>HOME</Link>
          <Link to='/review'>MOVIE REVIEWS</Link>
          <Link to='/' onClick={logout} className='google-button'>
            SIGN OUT
          </Link>
        </>
      ) : (
        <>
          <Link to='/'>HOME</Link>
          <Link to='/googleauth' className='google-button'>
            Login with Google
          </Link>
        </>
      )}
    </nav>
  )
}

export default Navbar
