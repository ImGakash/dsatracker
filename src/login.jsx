import { useState } from "react";

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
      const res = await fetch("http://localhost:3000/auth/login", {
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

  return (
    <div className="authCard">
      <h2>Welcome Back</h2>
      <p className="authSubtitle">Login to track your DSA progress</p>

      {error && <div className="authError">{error}</div>}

      <form onSubmit={handleLogin} className="authForm">
        <div className="inputGroup">
          <label htmlFor="login-email">Email Address</label>
          <input
            id="login-email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="authSwitchText">
        Don't have an account?{" "}
        <button type="button" className="linkBtn" onClick={onSwitchToSignup}>
          Sign Up
        </button>
      </p>
    </div>
  );
}