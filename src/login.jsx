import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login({ onLoginSuccess, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.token);
      
      // Notify parent component
      if (onLoginSuccess) {
        onLoginSuccess(data.token);
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async (response) => {
    const googleToken = response.credential;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: googleToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Google login failed");
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Notify parent component
      if (onLoginSuccess) {
        onLoginSuccess(data.token);
      }

    } catch (err) {
      console.error("Google Auth error:", err);
      setError("Network error. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authCard">
      <h2>Welcome Back</h2>
      <p className="authSubtitle">Login to track your DSA progress</p>

      {error && <div className="authError">{error}</div>}

      <form onSubmit={handleLogin} className="authForm">
        <div className="inputGroup">
          <label htmlFor="login-email">Email Address</label>
          <div className="inputWrapper">
            <svg
              className="inputIcon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              id="login-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="inputGroup">
          <label htmlFor="login-password">Password</label>
          <div className="inputWrapper">
            <svg
              className="inputIcon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p style={{ textAlign: "center" }}>OR</p>
      <GoogleLogin
        onSuccess={handleGoogleAuth}
        onError={() => console.log("Google Login Failed")}
      />

      <p className="authSwitchText">
        Don't have an account?{" "}
        <button type="button" className="linkBtn" onClick={onSwitchToSignup}>
          Sign Up
        </button>
      </p>
    </div>
  );
}