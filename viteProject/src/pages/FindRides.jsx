import React from "react";
import "./FindRides.css";

const FindRides = () => {
  return (
    <div className="find-container">
      <div className="find-card">

        <h1 className="find-title">Available Rides</h1>
        <p className="find-subtitle">Choose the best option for your journey</p>

        <div className="ride-option">
          <img src="https://cdn-icons-png.flaticon.com/512/743/743131.png" alt="Uber Go" />
          <div>
            <h3>Uber Go</h3>
            <p>Affordable and comfortable</p>
          </div>
          <span className="price">₹120</span>
        </div>

        <div className="ride-option">
          <img src="https://cdn-icons-png.flaticon.com/512/941/941808.png" alt="Auto" />
          <div>
            <h3>Uber Auto</h3>
            <p>Fast & budget friendly</p>
          </div>
          <span className="price">₹90</span>
        </div>

        <div className="ride-option">
          <img src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png" alt="Moto" />
          <div>
            <h3>Uber Moto</h3>
            <p>Cheapest two-wheeler ride</p>
          </div>
          <span className="price">₹60</span>
        </div>

        <button className="confirm-btn">Confirm Ride</button>

      </div>
    </div>
  );
};

export default FindRides;
