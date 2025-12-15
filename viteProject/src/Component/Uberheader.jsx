import React from "react";
import { MenuOutlined, UserOutlined, SearchOutlined } from "@ant-design/icons";
import "./UberHeader.css";

const UberHeader = ({ onMenuClick }) => {
  return (
    <header className="uber-header" role="banner" aria-label="Main header">
      <div className="uber-header__inner">
        <button
          className="uber-header__menu-btn"
          aria-label="Open menu"
          onClick={onMenuClick}
        >
          <MenuOutlined />
        </button>

        <a href="/" className="uber-header__logo" aria-label="Uber Home">
          <strong>UBER</strong>
        </a>

        <nav className="uber-header__nav" role="navigation" aria-label="Primary">
          <a className="nav-link" href="/Homee">Home</a>
          <a className="nav-link" href="/drive">Drive</a>
          <a className="nav-link" href="/ride">Ride</a>
        </nav>

        <div className="uber-header__search">
          <div className="search-location">
            <input
              type="text"
              className="search-input"
              placeholder="Enter pickup location"
              aria-label="Pickup location"
            />
            <span className="location-dot" title="Current location"></span>
          </div>

          <div className="search-action" aria-hidden="false">
            <input
              type="text"
              className="search-input"
              placeholder="Where to?"
              aria-label="Destination"
            />
            <button className="search-btn" aria-label="Search">
              <SearchOutlined />
            </button>
          </div>
        </div>

        <div className="uber-header__actions">
          <a className="action-btn desktop-only" href="/help">Help</a>
          <a className="action-btn" href="/login">
            <UserOutlined /> <span className="action-text">Log in</span>
          </a>
          <a className="cta-btn" href="/">Sign up</a>
        </div>
      </div>
    </header>
  );
};

export default UberHeader;
