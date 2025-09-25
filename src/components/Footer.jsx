import React from "react";
import { FaTwitter, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";
import "./../assets/css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-left">

          <p id="footer-description">
            <h3 className="footer-title">CS — Ticket System</h3>
            Welcome to the Customer Support Zone. This React-based application
            is designed to streamline ticket management by allowing you to
            display customer issues, track their progress, and efficiently mark
            them as resolved. Built with a responsive design, it provides a
            seamless experience for managing support tasks.
          </p>
        </div>

        <div className="footer-columns">
          <div className="footer-column">
            <h4>Company</h4>
            <p>About Us</p>
            <p>Our Mission</p>
            <p>Contact Sales</p>
          </div>
          <div className="footer-column">
            <h4>Services</h4>
            <p>Products & Services</p>
            <p>Customer Stories</p>
            <p>Download Apps</p>
          </div>
          <div className="footer-column">
            <h4>Information</h4>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
            <p>Join Us</p>
          </div>
          <div className="footer-column">
            <h4>Social Links</h4>
            <p>
              <FaTwitter /> @CS — Ticket System
            </p>
            <p>
              <FaLinkedin /> @CS — Ticket System
            </p>
            <p>
              <FaFacebook /> @CS — Ticket System
            </p>
            <p>
              <FaEnvelope /> support@cst.com
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 CS — Ticket System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
