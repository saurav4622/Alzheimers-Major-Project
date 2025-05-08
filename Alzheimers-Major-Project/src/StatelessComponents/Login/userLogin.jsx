import React, { useState } from "react";
import Aurora from "../../StatefullComponents/Aurora/Aurora.jsx";
import "./login.css";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      alert("Please fill in both fields!");
      return;
    }

    // Future: connect to backend API here
    console.log("Logging in with:", { email, password });

    // Example: send API request
    // axios.post('/api/login', { email, password }).then(...)
  };

  return (
    <div className="login-page">
      <Aurora />

      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
