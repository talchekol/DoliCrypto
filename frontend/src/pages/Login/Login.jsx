import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // הפכנו את הפונקציה ל-async כדי לנהל את מצב הטעינה בצורה נקייה
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setError("");
    setIsLoading(true); // 1. מפעילים את מצב הטעינה וחוסמים את הכפתור

    try {
      await onLogin(email, password); // מחכים שהתחברות תסתיים בהצלחה
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false); // 2. מכבים את הטעינה (בין אם הצליח ובין אם נכשל)
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Sign In</h2>

        {error && <p className="auth-error">{error}</p>}

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

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? "Signing In... please Wait" : "Sign In"}
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
