import { useState } from "react";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");

        // Save user information
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Cannot connect to server");
    }
  };

  return (
    <div className="login-page">
      <Navbar />

      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </form>

          {message && <p className="bid-message">{message}</p>}

          <p>
            Don't have an account?{" "}
            <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;