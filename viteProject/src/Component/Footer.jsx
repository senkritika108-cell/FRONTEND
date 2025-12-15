import React from "react";
import "./Footer.css";
import {
  FacebookFilled,
  TwitterCircleFilled,
  InstagramFilled,
  YoutubeFilled,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="uber-footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>Uber</h3>
          <ul>
            <li><a href="/about">About us</a></li>
            <li><a href="/news">Newsroom</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/api">API</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Products</h3>
          <ul>
            <li><a href="/ride">Ride</a></li>
            <li><a href="/drive">Drive</a></li>
            <li><a href="/eat">Uber Eats</a></li>
            <li><a href="/freight">Uber Freight</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><a href="/help">Help Center</a></li>
            <li><a href="/safety">Safety</a></li>
            <li><a href="/accessibility">Accessibility</a></li>
            <li><a href="/faqs">FAQs</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-icons">
            <FacebookFilled className="icon" />
            <TwitterCircleFilled className="icon" />
            <InstagramFilled className="icon" />
            <YoutubeFilled className="icon" />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2025 Uber Technologies Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;