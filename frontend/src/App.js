import { useState, createContext, useEffect } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './sass/App.sass';

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  const googleUrl = 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&prompt-select_account&client_id=812824398261-5ofavj8ubto60jeir8haq2rulvuidha0.apps.googleusercontent.com&scope=openid%20profile%20email%20https://www.googleapis.com/auth/calendar&redirect_uri=http%3A//localhost:3000/login';

  useEffect(() => {
    let token = localStorage.getItem('jwt');

    try {
      if (jwt_decode(token)) {
        setUser(jwt_decode(token));
      }

      if (jwt_decode(token).exp < Date.now() / 1000) {
        setUser(null);
        localStorage.removeItem('jwt');
        localStorage.removeItem('access_token');
      }
    } catch (error) {
      return;
    }
  }, []);

  return (
    <Router>
      <UserContext.Provider value={user}>
        <Navbar setUser={setUser} />
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route
            path='/googleauth'
            component={() => {
              window.location.href = googleUrl;
              return null;
            }}></Route>
          <Route path='/login' component={Login}></Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
