import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { logout } from '../../redux/actions/authAction';

const Navbar = () => {
  const [redirect, setRedirect] = useState(false);

  const logoutHandler = () => {
    logout();
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <nav
      className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
      id="navbarBlur"
      data-scroll="true"
    >
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <h6 className="font-weight-bolder mb-0">Agucor</h6>
        </nav>
        <div
          className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
          id="navbar"
        >
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group input-group-outline"></div>
          </div>
          <ul className="navbar-nav  justify-content-end">
            <li className="nav-item d-flex align-items-center">
              <button
                onClick={logoutHandler}
                className="nav-link text-body font-weight-bold px-0"
              >
                <i className="fa fa-user me-sm-1" />
                <span className="d-sm-inline d-none">Sign In</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
