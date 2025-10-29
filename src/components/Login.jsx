import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Login({ setPage, setUserData, setMessageModal }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const users = JSON.parse(localStorage.getItem("mock_users") || "[]");
    const match = users.find((u) => u.email === formData.email && u.password === formData.password);
    setTimeout(() => {
      if (!match) {
        setMessageModal({ isOpen: true, title: "Login Failed", message: "Invalid email or password. Check your credentials.", type: "error" });
      } else {
        setUserData({ ...match, id: match.id });
        setMessageModal({ isOpen: true, title: "Login Successful", message: `Welcome back, ${match.name}!`, type: "success" });
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="auth-container">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="auth-card">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required disabled={loading} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required disabled={loading} />
          <button type="submit" disabled={loading}>{loading ? "Logging In..." : "Login"}</button>
        </form>
        <p>Don’t have an account? <span onClick={() => setPage("signup")} className="auth-link">Sign up</span></p>
      </motion.div>
    </div>
  );
}
