import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome back</h2>
        <p className="login-subtitle">Enter your details to continue</p>

        <form className="login-form">
          <label className="login-label">Email</label>
          <input
            className="login-input"
            type="email"
            placeholder="Enter your email"
            required
          />
            

          <label className="login-label">Password</label>
          <input
            className="login-input"
            type="password"
            placeholder="Enter your password"
            required
          />

          <button className="login-btn" type="submit">
            Log in
          </button>
        </form>

        <div className="login-footer">
          <a href="/forgot" className="forgot-link">
            Forgot Password?
          </a>
          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;