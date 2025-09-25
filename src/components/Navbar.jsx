import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../assets/css/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>PrimeSoft</h2>
      </div>
  
      <div 
        className={`hamburger-menu ${isMenuOpen ? "open" : ""}`} 
        onClick={handleMenuToggle}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`navbar-right ${isMenuOpen ? "open" : ""}`}>
        <ul>
          {/* Use Link components for navigation to different routes */}
          <li onClick={handleNavLinkClick}>
            <Link to="/">Home</Link>
          </li>
          {/* New Customer Service link */}
          <li onClick={handleNavLinkClick}>
            <Link to="/customer_service">Customer Service</Link>
          </li>
          <li onClick={handleNavLinkClick}>
            <Link to="/faq">FAQ</Link>
          </li>
          <li onClick={handleNavLinkClick}>Changelog</li>
          <li onClick={handleNavLinkClick}>Blog</li>
          <li onClick={handleNavLinkClick}>Download</li>
          <li onClick={handleNavLinkClick}>Contact</li>
        </ul>
        <button className="new-ticket-btn" onClick={handleNavLinkClick}>+ New Ticket</button>
      </div>
    </nav>
  );
};

export default Navbar;
