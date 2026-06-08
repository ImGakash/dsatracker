import { useState } from "react";

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
      const res = await fetch("http://localhost:3000/auth/signup", {
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
          <input
            id="signup-name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="signup-email">Email Address</label>
          <input
            id="signup-email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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