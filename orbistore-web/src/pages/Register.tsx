import React from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { signup } from "../features/auth/auth.service";
import { Navigate } from "react-router-dom";

function Register() {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    dispatch(signup(form));
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="page-container">
      <div className="page-group"></div>
      <div className="page-group">
        <h2>Get Started with Orbistore</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
