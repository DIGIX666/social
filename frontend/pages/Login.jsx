import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectVar, setRedirectVar] = useState(false);

  // Redirect
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault(); // prevent reload.

    // Create new user as JS object.
    const userToLogin = {
      email,
      password,
    };

    // Send user data to golang register function.
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userToLogin),
    });

    const validUser = await response.json();
    setRedirectVar(true);
    props.setName(validUser.first);
  };

  if (redirectVar) {
    return navigate("/"); // This is still iffy!!! ????????????
  }

  return (
    <div>
      <main className="form-signin w-100 m-auto" style={{ display: "block" }}>
        <div className="loginform">
          <h1 className="h3 mb-3 fw-normal">Login</h1>
          <form onSubmit={submit}>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput email_input"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="log_button" type="submit">
              Log in
            </button>
          </form>
          <div className="footer_login">
            <span>Already have an account? &nbsp;</span>
            <Link to="/register" style={{ color: "grey" }}>
              Register
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
