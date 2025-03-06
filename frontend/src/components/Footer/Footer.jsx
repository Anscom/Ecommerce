import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>For Business</h4>
          <ul>
            <li><a href="#">Employer</a></li>
            <li><a href="#">Health Plan</a></li>
            <li><a href="#">Individual</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Resource Center</a></li>
            <li><a href="#">Testimonials</a></li>
            <li><a href="#">STV</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Partners</h4>
          <ul>
            <li><a href="#">Swing Tech</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Career</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Coming soon on</h4>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <hr></hr>

      <div className="footer-bottom">
        <p>©2025 Shop Now. All rights reserved.</p>
        <ul>
          <li><a href="#">Terms & Conditions</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Security</a></li>
          <li><a href="#">Cookie Declaration</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
