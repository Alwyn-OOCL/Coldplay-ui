import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../api/authApi";
import { useAuth } from "../../../contexts/AuthContext";
import "./Auth.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { setToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(credential, password).then((response) => {
      if (response.success) {
        setToken({
          token: response.data.token,
          id: response.data.id,
          isRemember: rememberMe,
        });
        // 跳到上一个页面
        navigate(-1);
      } else {
        setError(response.errorMsg);
      }
    });
  };

  const handleChange = (e) => {
    const { checked } = e.target;
    setRememberMe(checked);
  };

  return (
    <div className="auth-page">
      <main className="auth-container">
        <div className="auth-card">
          <h2>Log In</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Email / Username"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className="error-message">{error}</p>}
            </div>
            <button type="submit" className="auth-submit login">
              Log In
            </button>
            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="rememberMe"
                  onChange={handleChange}
                />
                <span>Remember Me</span>
              </label>
            </div>
          </form>
          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
