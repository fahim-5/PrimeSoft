import React, { useState } from "react";
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
        <h2>CS — Ticket System</h2>
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
          <li onClick={handleNavLinkClick}>Home</li>
          <li onClick={handleNavLinkClick}>FAQ</li>
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