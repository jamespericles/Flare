import axios from 'axios';
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';

const SignUp = () => {
  const history = useHistory();

  const [signUpCreds, setSignUpCreds] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignUpCreds({ ...signUpCreds, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('/api/users/signup', {
        email: signUpCreds.email,
        password: signUpCreds.password,
      })
      .then((response) => {
        console.log('RESPONSE', response);
        history.replace('/login');
      })
      .catch((error) => {
        console.log('ERROR', error);
      });

    setSignUpCreds({email: '', password: ''})
  };

  return (
    <div className="text-center">
      <Navbar />
      <h4>Sign Up</h4>
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
            value={signUpCreds.email}
            onChange={handleChange}
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
            value={signUpCreds.password}
            onChange={handleChange}
          />
          <button className="btn btn-lg btn-block" style={{ backgroundColor: "#E8C547" }} type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
