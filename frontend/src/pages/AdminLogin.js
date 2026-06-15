import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { adminLogin } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await adminLogin({ email, password });
      loginAdmin(data.token, data.admin);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid admin credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cp-auth-page">
      <div className="cp-auth-wrapper">
        <div className="cp-auth-card">
          <div className="cp-auth-topbar">
            <Link to="/" className="cp-auth-brand">Career Pathway</Link>
            <span style={{ fontSize: 13, color: "#5b6485" }}>Admin Portal</span>
          </div>

          <div className="cp-auth-body">
            <h1 className="cp-auth-title">Admin Login</h1>

            {error && (
              <div style={{ background: "#fee2e2", color: "#dc2626", padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
                {error}
              </div>
            )}

            <form className="cp-auth-form" onSubmit={handleSubmit}>
              <div className="cp-auth-field">
                <label htmlFor="email">Admin Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@careerpathway.cm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="cp-auth-field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="cp-auth-submit" disabled={loading}>
                {loading ? "Logging in..." : "Login as Admin"}
              </button>

              <p className="cp-auth-toggle-text">
                Are you a student?{" "}
                <Link to="/login" style={{ color: "#5b8def" }}>Student Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
