import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Signup({ onSignupSuccess, onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      setSuccessMsg("Registration successful! You can now log in.");
      setName("");
      setEmail("");
      setPassword("");

      // Automatically switch to Login tab after 1.5 seconds
      setTimeout(() => {
        if (onSignupSuccess) {
          onSignupSuccess();
        }
      }, 1500);

    } catch (err) {
      console.error("Signup error:", err);
      setError("Network error. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authCard">
      <h2>Create Account</h2>
      <p className="authSubtitle">Join and start tracking your DSA journey</p>

      {error && <div className="authError">{error}</div>}
      {successMsg && <div className="authSuccess">{successMsg}</div>}

      <form onSubmit={handleSignup} className="authForm">
        <div className="inputGroup">
          <label htmlFor="signup-name">Full Name</label>
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <input
              id="signup-name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="inputGroup">
          <label htmlFor="signup-email">Email Address</label>
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
              id="signup-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="inputGroup">
          <label htmlFor="signup-password">Password</label>
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
              id="signup-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-success">
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <p className="authSwitchText">
        Already have an account?{" "}
        <button type="button" className="linkBtn" onClick={onSwitchToLogin}>
          Login
        </button>
      </p>
    </div>
  );
}