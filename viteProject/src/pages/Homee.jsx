import React from "react";
import "./Homee.css";

const Homee = () => {
  return (
    <>
      <div className="homee-container">

        {/* LEFT SECTION */}
        <div className="homee-left">
          <h1 className="homee-title">
            Move the Way You Want<br />with Uber
          </h1>

          <p className="homee-subtitle">
            Choose your ride, apply offers, and travel comfortably anytime.
          </p>

          {/* NEW INPUTS */}
          <div className="input-group">
            <select className="homee-input">
              <option>Select Ride Type</option>
              <option>Uber Go</option>
              <option>Uber Auto</option>
              <option>Uber Moto</option>
              <option>Uber Premier</option>
            </select>
          </div>

          <div className="input-group">
            <input
              type="number"
              className="homee-input"
              placeholder="Number of Passengers"
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              className="homee-input"
              placeholder="Promo Code (Optional)"
            />
          </div>

          <div className="homee-btn-group">
            <button className="homee-btn black">Find Rides</button>
            <button className="homee-btn gray">Explore Options</button>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="homee-right">
          <img
            src="https://www.careeraddict.com/uploads/article/61365/how-to-become-an-uber-driver.png"
            alt="Uber Illustration"
            className="homee-image"
          />
        </div>

      </div>
    </>
  );
};

export default Homee;
