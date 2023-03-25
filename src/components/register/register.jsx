import { useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../helper";
import './register.css'

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [response, setResponse] = useState([]);

  async function registerUser(event) {
    event.preventDefault();
    if (username.trim() === "") {
      alert("Username is Required");
      return;
    }
    if (email.trim() === "") {
      alert("Email is Required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Email is Invalid");
      return;
    }
    if (password.trim() === "") {
      alert("Password is required");
      return;
    }
    if (confirmPassword.trim() === "") {
      alert("Confirm Password is required");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const resp = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await resp.json();

    if (data) {
      setResponse(data.message);
      window.location.href = '/notes'
    }
  }

  return (
    <div className="register-page">
      <form className="form" onSubmit={registerUser}>
        <h2>Register</h2>
        {response && <p className="response">{response}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit"> <Link to="/notes"> Register</Link></button>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
