import React from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login } from "../features/auth/auth.service";
import { Navigate } from "react-router-dom";
import OrbistoreIcon from "../assets/SVG/orbistore-logo-02.svg";

function Login() {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    dispatch(login(form));
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="base-wrapper">
      <div className="base-group">
        <div className="left-group">
          <img
            src={OrbistoreIcon}
            alt="Orbistore Icon"
            className="orbistore-logo"
            width={150}
          />
          <p>
            Search, find and <span style={{ color: "#5b33d7" }}>buy</span> all you want
            <br /> and you will <span style={{ color: "#0e7af9" }}>get it!</span>
          </p>
        </div>
        <div className="right-group">
          <div className="auth-box">
            <h2>Log into Orbistore</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div> 
                <button className="action-btn" type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Login"}
                </button>
              </div>

              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>

            <div className="options-btn">
              <div>
                <button className="opt-btn" type="button">Forgot Password?</button>
              </div>
              <div>
                <button className="opt-btn" type="button">Create Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
