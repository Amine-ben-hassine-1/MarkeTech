import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Image/logo.jpg';

const H = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark bg-gradient">
        <div className="container">
          <img
            src={logo}
            alt="Logo du site"
            className="logo"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%', // Makes the image circular
              objectFit: 'cover',  // Adjusts the image to fill the circle without distortion
              border: '2px solid #ddd' // Adds a light border for better style
            }}
          />
          <h1 className="navbar-brand text-danger fw-bold">
         
              MarkeTech
          
          </h1>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">Acceuil</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/Offers">Offres</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/Profile">Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/Cart">
                  Panier
                </Link>
              </li>
              <li className="nav-item dropdown">
                {/* Replacing <a> with <Link> */}
                <Link
                  className="nav-link text-white dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/Cat/TV">
                      TV
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Cat/Ordinateurs">
                      Ordinateurs
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Cat/telephones">
                      Téléphones
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default H;
