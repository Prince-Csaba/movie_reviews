import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

function Login(props) {
  const search = useLocation().search;
  const code = new URLSearchParams(search).get('code');
  let history = useHistory();

  useEffect(() => {
    axios
      .post('http://localhost:8080/api/login', { code })
      .then((res) => {
        localStorage.setItem('jwt', res.data);
        history.push('/');
        history.go(0);
      })
      .catch((err) => console.log(err.response));
  }, [code, history]);

  return (
    <div>
      <h3>Authentication in progress...</h3>
    </div>
  );
}

export default Login;
