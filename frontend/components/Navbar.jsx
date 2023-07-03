import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  const logout = async () => {
    // ...
  };

  const onHover = (ev) => {
    // ...
  };

  const isLoginPage = window.location.pathname === "/login";
  const isRegisterPage = window.location.pathname === "/register";

  // Ne pas afficher la barre de navigation sur la page de connexion ou d'inscription
  if (isLoginPage || isRegisterPage) {
    return null;
  }

  return (
    <nav className="navbar navbar-dark navbar-expand-md">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Social Network
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onMouseEnter={onHover}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav ml-auto">
            {props.name ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="fas fa-house" aria-hidden="true"></i>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/public-profiles">
                    <i className="fas fa-user-group" aria-hidden="true"></i>
                    Profiles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" onClick={logout} to="/login">
                    <i
                      className="fas fa-arrow-right-from-bracket"
                      aria-hidden="true"
                    ></i>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i
                      className="fas fa-arrow-right-to-bracket"
                      aria-hidden="true"
                    ></i>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <i className="fas fa-user-plus" aria-hidden="true"></i>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
