import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css' // Assuming you keep the CSS here for the current structure

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
        {/* Logo/Brand Link */}
        <h2> <Link to="/">PrimeSoft</Link> </h2>
      </div>
  
      {/* Hamburger Menu Icon (for mobile) */}
      <div 
        className={`hamburger-menu ${isMenuOpen ? "open" : ""}`} 
        onClick={handleMenuToggle}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Navigation Links */}
      <div className={`navbar-right ${isMenuOpen ? "open" : ""}`}>
        <ul>
          
          <li onClick={handleNavLinkClick}>
            <Link to="/">Home</Link>
          </li>

          {/* Replaced 'Customer Service' with 'Support Hub' (A dedicated help area) */}
          <li onClick={handleNavLinkClick}>
            <Link to="/customer_service">Support Hub</Link>
          </li>

          {/* FAQ link is kept, but could be a sub-section of Support Hub */}
          <li onClick={handleNavLinkClick}>
            <Link to="/faq">FAQ</Link>
          </li>

          {/* Replaced 'Changelog' with 'Updates' (more user-friendly) */}
          <li onClick={handleNavLinkClick}>
            <Link to="/updates">Updates</Link>
          </li>

          {/* Replaced 'Blog' with 'Resources' (often includes Blog, Case Studies, Guides) */}
          <li onClick={handleNavLinkClick}>
            <Link to="/resources">Resources</Link>
          </li>
          
          {/* Kept 'Download' (crucial for software) */}
          <li onClick={handleNavLinkClick}>
            <Link to="/download">Download</Link>
          </li>

          {/* Added 'About Us' (important for trust and context) */}
          <li onClick={handleNavLinkClick}>
            <Link to="/about">About Us</Link>
          </li>
        </ul>

        {/* Action Button: Login (often a primary support CTA) */}
        <Link 
          to="/login" 
          className="login-btn" 
          onClick={handleNavLinkClick}
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;