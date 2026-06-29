import React from "react";
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
          <a href="/" className="navbar__link navbar__link--active">
            <FiHome />
            Home
          </a>
        </li>
        <li className="navbar__item">
          <a href="/watchlist" className="navbar__link">
            <FiStar />
            Watchlist
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
