// This component is the simple navbar shown on the login/account create screens...
import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { LOADING, UNSET_USER } from '../store/actions';
import { useStoreContext } from '../store/store';

const Navbar = () => {
  const [state, dispatch] = useStoreContext();
  const history = useHistory();

  const logout = (event) => {
    event.preventDefault();

    dispatch({ type: LOADING });

    axios
      .get('/api/users/logout')
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: UNSET_USER });
          history.replace('/login');
        }
      })
      .catch((error) => {
        console.log('Logout error');
      });
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#364156", color: "#E8c547" }}>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        style={{ backgroundColor: "#00A8BA" }}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {state.user ? (
            <li className="nav-item active">
              <Link to="#" className="btn btn-link text-secondary" onClick={logout}>
                <span className="text-secondary">Logout</span>
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item active">
                <Link to="/login" className="btn btn-link" style={{ color: "#E8c547", textDecoration: "none" }}>
                  <span>Login</span>
                </Link>
              </li>
              <li className="nav-item active">
                <Link to="/signup" className="btn btn-link" style={{ color: "#E8c547", textDecoration: "none" }}>
                  <span>Sign up</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
