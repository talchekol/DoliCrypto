import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setError("");
    onRegister(name, email, password).catch((err) => {
      setError(err.message || "Registration failed. Please try again.");
    });
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Sign Up</h2>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Create your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            Sign Up
          </button>
        </form>

        <p className="auth-switch-text">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
