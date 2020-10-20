import axios from 'axios';
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { useHistory } from 'react-router-dom';
import { LOADING, SET_USER } from '../store/actions';
import { useStoreContext } from '../store/store';
import Footer from '../components/Footer';

const Login = () => {
  const [state, dispatch] = useStoreContext();
  const history = useHistory();

  const [loginCreds, setLoginCreds] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginCreds({ ...loginCreds, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({ type: LOADING });

    // Handle Login
    axios
      .post('/api/users/login', {
        email: loginCreds.email,
        password: loginCreds.password,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: SET_USER, user: response.data });
          history.replace('/');
        }
      })
      .catch((error) => {
        console.log('login error: ');
        console.log(error);
      });

      setLoginCreds({email: '', password: ''})
  };

  return (
    <div className="text-center">
      <Navbar />
      <h4>Login</h4>
      <div style={{ margin: "0 3em 0 3em" }}>
        <form className="form-signin">
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          name="email"
          placeholder="Email address"
          value={loginCreds.email}
          onChange={handleChange}
          style={{ margin: "1em 0 1em 0" }}
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          name="password"
          placeholder="Password"
          value={loginCreds.password}
          onChange={handleChange}
          style={{ margin: "1em 0 1em 0" }}
        />
        <button className="btn btn-lg btn-block" style={{ backgroundColor: "#E8C547" }} type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
      <Footer />
    </div>
  );
};

export default Login;
