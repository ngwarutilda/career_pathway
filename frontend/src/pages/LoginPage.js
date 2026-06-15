import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, signup } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import "./LoginPage.css";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [mode, setMode] = useState("login");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const { data } = await login({ email, password });
        loginUser(data.token, data.user);
        navigate(data.redirectTo);
      } else {
        const { data } = await signup({ name: username, email, password });
        loginUser(data.token, data.user);
        navigate(data.redirectTo);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cp-auth-page">
      <div className="cp-auth-wrapper">
        <div className="cp-auth-card">

          {/* Top bar */}
          <div className="cp-auth-topbar">
            <Link to="/" className="cp-auth-brand">
              <img src={logo} alt="Career Pathway" style={{ height: 120 }} />
            </Link>
            <button
              type="button"
              className="cp-auth-switch"
              onClick={() => { setMode(isLogin ? "signup" : "login"); setError(""); }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>

          {/* Body */}
          <div className="cp-auth-body">
            <h1 className="cp-auth-title">
              {isLogin ? "Welcome Back!" : "Create Your Account"}
            </h1>
            <p className="cp-auth-subtitle">
              {isLogin
                ? "Log in to access your personalized recommendations."
                : "Join thousands of students planning their future."}
            </p>

            {error && (
              <div style={{
                background: "#fee2e2", color: "#dc2626",
                padding: "10px 14px", borderRadius: 8,
                marginBottom: 16, fontSize: 14
              }}>
                {error}
              </div>
            )}

            <form className="cp-auth-form" onSubmit={handleSubmit}>

              {!isLogin && (
                <div className="cp-auth-field">
                  <label htmlFor="username">Full Name</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Your full name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="cp-auth-field">
                <label htmlFor="email">
                  {isLogin ? "Email" : "Email Address"}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="cp-auth-field">
                <label htmlFor="password">Password</label>
                <div className="cp-auth-input-wrap">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="cp-auth-eye"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {isLogin && (
                <a href="#forgot" className="cp-auth-forgot">
                  Forgot Password?
                </a>
              )}

              <button type="submit" className="cp-auth-submit" disabled={loading}>
                {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
              </button>

              <p className="cp-auth-toggle-text">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  className="cp-auth-toggle-link"
                  onClick={() => { setMode(isLogin ? "signup" : "login"); setError(""); }}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;