import React from "react";
import { motion } from "framer-motion";
import { IconUser } from "./_icons";

export default function ProfileCard({ userData, userId }) {
  return (
    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <IconUser className="mr-2 w-5 h-5" style={{ color: "#e94560", marginRight: "0.5rem" }} /> Account Details
      </h2>
      <div className="profile-grid">
        <div>
          <p className="dashboard-text-label">Name</p>
          <p className="dashboard-text-value">{userData.name}</p>
        </div>
        <div>
          <p className="dashboard-text-label">Email</p>
          <p className="dashboard-text-value">{userData.email}</p>
        </div>
        <div style={{ gridColumn: "span 2 / span 2" }}>
          <p className="dashboard-text-label">Unique User ID</p>
          <p className="dashboard-text-value text-xs break-all">{userId}</p>
        </div>
      </div>
    </motion.div>
  );
}
