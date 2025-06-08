import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "./assets/logo.png";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
        <img src={logo} alt="Smart Shopping BiH" className="logo" />
      </Link>

      <div className="menu-toggle" onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <li className={isActive("/")}>
          <Link to="/" onClick={closeMobileMenu}>Početna</Link>
        </li>
        <li className={isActive("/about")}>
          <Link to="/about" onClick={closeMobileMenu}>O nama</Link>
        </li>
        
        <li className={isActive("/contact")}>
          <Link to="/contact" onClick={closeMobileMenu}>Kontakt</Link>
        </li>

        <li className={isActive("/shop")}>
          <Link to="/shop" onClick={closeMobileMenu}>Kupovina</Link>
        </li>


        <li className={`cart-link ${isActive("/cart")}`}>
          <Link to="/cart" onClick={closeMobileMenu}>
            Korpa
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </Link>
        </li>

        {currentUser ? (
          <>
            {(currentUser.role === 'admin' || currentUser.role.startsWith('admin-')) && (
              <li className={(isActive("/admin") || location.pathname.includes("/admin-")) ? "active" : undefined}>
                <Link
                  to={currentUser.role === 'admin' ? "/admin" : `/admin-${currentUser.role.split('-')[1]}`}
                  onClick={closeMobileMenu}
                >
                  Admin panel
                </Link>
              </li>
            )}

            <li className={isActive("/profil")}>
              <Link to="/profil" onClick={closeMobileMenu}>
                Profil
              </Link>
            </li>

            <li className="user-menu">
              <div className="user-info">
                <span>{currentUser.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Odjava
                </button>
              </div>
            </li>
          </>
        ) : (
          <li className={isActive("/login")}>
            <Link to="/login" onClick={closeMobileMenu} className="login-btn">
              Prijava
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
