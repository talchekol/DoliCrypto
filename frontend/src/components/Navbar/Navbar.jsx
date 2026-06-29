import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import doliCryptoLogo from "../../assets/DoliNavLogo.png";
import { FiHome, FiStar } from "react-icons/fi";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img
          className="navbar__logo-image"
          src={doliCryptoLogo}
          alt="DoliCrypto Logo"
        />
        <span className="navbar__logo-text">
          Doli<span className="navbar__logo-text-white"></span>
          <span className="navbar__logo-text-green">Crypto</span>
        </span>
      </div>
      <ul className="navbar__menu">
        <li className="navbar__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
          >
            <FiHome />
            Home
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
          >
            <FiStar />
            Watchlist
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
