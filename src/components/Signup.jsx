import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Signup({ setPage, setMessageModal }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const users = JSON.parse(localStorage.getItem("mock_users") || "[]");
    if (users.find((u) => u.email === formData.email)) {
      setMessageModal({ isOpen: true, title: "Signup Failed", message: "This email address is already registered.", type: "error" });
      setLoading(false);
      return;
    }
    const id = crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
    const newUser = { id, name: formData.name, email: formData.email, password: formData.password, createdAt: Date.now() };
    users.push(newUser);
    localStorage.setItem("mock_users", JSON.stringify(users));
    setMessageModal({ isOpen: true, title: "Signup Successful", message: "Your account has been created. Please log in.", type: "success" });
    setLoading(false);
    setPage("login");
  };

  return (
    <div className="auth-container">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="auth-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required disabled={loading} />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required disabled={loading} />
          <input type="password" name="password" placeholder="Create Password (Min 6 chars)" value={formData.password} onChange={handleChange} required minLength={6} disabled={loading} />
          <button type="submit" disabled={loading}>{loading ? "Registering..." : "Sign Up"}</button>
        </form>
        <p>Already have an account? <span onClick={() => setPage("login")} className="auth-link">Log in</span></p>
      </motion.div>
    </div>
  );
}
