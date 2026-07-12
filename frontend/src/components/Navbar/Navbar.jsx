import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import doliCryptoLogo from "../../assets/DoliNavLogo.png";
import { FiHome, FiStar, FiMenu, FiX, FiLogOut } from "react-icons/fi";

function Navbar({ onLogout }) {
  // מצב של תפריט פתוח או סגור
  const [menuOpen, setMenuOpen] = useState(false);
  // פונקציה לסגירת התפריט
  const closeMenu = () => setMenuOpen(false);

  // פונקציה פנימית שמטפלת בלחיצה על התנתקות
  const handleLogoutClick = () => {
    closeMenu(); // סוגר את תפריט המובייל אם הוא היה פתוח
    onLogout(); // מפעיל את לוגיקת הניתוק המרכזית
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img
          className="navbar__logo-image"
          src={doliCryptoLogo}
          alt="DoliCrypto Logo"
        />
        <span className="navbar__logo-text">
          Doli
          <span className="navbar__logo-text-green">Crypto</span>
        </span>
      </div>

      <button
        // כפתור המבורגר לפתיחת וסגירת התפריט
        className="navbar__hamburger"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <ul
        // רשימת הקישורים בתפריט
        className={`navbar__menu${menuOpen ? " navbar__menu--open" : ""}`}
      >
        <li className="navbar__item">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
            onClick={closeMenu}
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
            onClick={closeMenu}
          >
            <FiStar />
            Watchlist
          </NavLink>
        </li>
        <li className="navbar__item">
          <button
            className="navbar__link navbar__link--logout"
            onClick={handleLogoutClick}
          >
            <FiLogOut />
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
