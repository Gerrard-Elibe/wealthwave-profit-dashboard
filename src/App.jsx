import React, { useState, useCallback } from "react";
import Modal from "./components/Modal";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { firebaseConfig } from "./config/firebase";

export default function App() {
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState("login");
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", type: "info" });

  const closeModal = useCallback(() => setModal((p) => ({ ...p, isOpen: false })), []);
  const setMessageModal = useCallback((m) => setModal(m), []);

  return (
    <>
      <div style={{ display: "none" }}>{JSON.stringify(firebaseConfig)}</div>
      {userData ? (
        <Dashboard userData={userData} setUserData={setUserData} setMessageModal={setMessageModal} />
      ) : page === "signup" ? (
        <Signup setPage={setPage} setMessageModal={setMessageModal} />
      ) : (
        <Login setPage={setPage} setUserData={setUserData} setMessageModal={setMessageModal} />
      )}
      <Modal isOpen={modal.isOpen} title={modal.title} message={modal.message} onClose={closeModal} type={modal.type} />
    </>
  );
}
