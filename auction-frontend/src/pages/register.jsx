import { useState } from "react";
import Navbar from "../components/Navbar";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Cannot connect to server");
    }
  };

  return (
    <div className="register-page">
      <Navbar />

      <div className="login-container">
        <div className="login-box">
          <h2>Create Account</h2>

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit">Register</button>
          </form>

          {message && <p className="bid-message">{message}</p>}

          <p>
            Already have an account?{" "}
            <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;