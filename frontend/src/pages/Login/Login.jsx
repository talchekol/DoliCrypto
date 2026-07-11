import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    onLogin(email, password);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Sign In</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            Sign In
          </button>
        </form>

        <p className="auth-switch-text">
          Don't have an account?{" "}
          <Link to="/register" className="auth-link">
            Sign Up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
