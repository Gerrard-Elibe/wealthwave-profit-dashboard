import React from "react";
import { motion } from "framer-motion";

// Utility Icons (Simplified for brevity, assuming they are defined correctly)
const IconTimes = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
const IconCheckCircle = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
);
const IconExclamationTriangle = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.8 18.01C1.65 18.3 1.7 18.6 1.88 18.81C2.07 19.03 2.37 19.14 2.68 19.14H21.32C21.63 19.14 21.93 19.03 22.12 18.81C22.3 18.6 22.35 18.3 22.2 18.01L13.71 3.86C13.56 3.57 13.26 3.42 12.93 3.42H11.07C10.74 3.42 10.44 3.57 10.29 3.86Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
);

// Define styles using an object for internal CSS
const styles = {
    // Variable setup (must match variables in your main CSS file)
    colors: {
        cardDark: '#160033', // --color-card-dark
        textLight: '#e4e4e7', // --color-text-light
        primary: '#6a5af9', // --color-primary
        success: '#00ff88', // --color-success
        error: '#ff4d6d', // --color-error
        border: 'rgba(255, 255, 255, 0.1)', // --color-border
    },

    modalBackdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.75)', // Dark transparent overlay
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(5px)',
    },

    modalContent: {
        background: `linear-gradient(160deg, #160033, #0a001b)`, // Dark gradient background
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(106, 90, 249, 0.4)',
        width: '90%',
        maxWidth: '400px',
        color: 'white',
        borderTop: '5px solid transparent', // Will be overridden by colorClass
        position: 'relative',
    },

    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
    },

    modalIconGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },

    modalTitle: {
        fontSize: '1.5rem',
        fontWeight: 700,
    },

    modalMessage: {
        marginBottom: '1.5rem',
        color: 'var(--color-text-muted)',
    },

    modalCloseBtn: {
        background: 'none',
        border: 'none',
        color: 'var(--color-text-muted)',
        cursor: 'pointer',
        padding: '5px',
        transition: 'color 0.2s',
    },
    
    modalCloseBtnHover: {
        color: 'white',
    },

    modalActionBtn: {
        width: '100%',
        padding: '0.75rem',
        fontWeight: 'bold',
        color: 'white',
        background: `linear-gradient(90deg, ${'#6a5af9'}, ${'#8e44ad'})`,
        borderRadius: '0.5rem',
        border: 'none',
        cursor: 'pointer',
        transition: 'opacity 0.2s',
    },
    
    modalActionBtnHover: {
        opacity: 0.9,
    },

    // Type-specific colors (Applied via inline style or logic)
    borderSuccess: { borderTopColor: '#00ff88' },
    borderError: { borderTopColor: '#ff4d6d' },
    borderInfo: { borderTopColor: '#6a5af9' },
    iconSuccess: { color: '#00ff88' },
    iconError: { color: '#ff4d6d' },
    iconInfo: { color: '#6a5af9' },
};

// Component Definition
export default function Modal({ isOpen, title, message, onClose, type = "info" }) {
  if (!isOpen) return null;

  let IconComponent, typeStyles;

  // Determine styles based on type
  switch (type) {
    case "success":
      IconComponent = IconCheckCircle;
      typeStyles = styles.borderSuccess;
      break;
    case "error":
      IconComponent = IconExclamationTriangle;
      typeStyles = styles.borderError;
      break;
    default:
      IconComponent = IconExclamationTriangle;
      typeStyles = styles.borderInfo;
  }
  
  const iconStyle = type === "success" ? styles.iconSuccess : 
                    type === "error" ? styles.iconError : 
                    styles.iconInfo;


  return (
    <div style={styles.modalBackdrop} onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.85, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        style={{ ...styles.modalContent, ...typeStyles }}
        // Prevent closing modal when clicking inside the content area
        onClick={(e) => e.stopPropagation()} 
      >
        <div style={styles.modalHeader}>
          <div style={styles.modalIconGroup}>
            {/* Apply icon style */}
            <IconComponent style={{ width: 24, height: 24, ...iconStyle }} />
            <h3 style={styles.modalTitle}>{title}</h3>
          </div>
          <button onClick={onClose} style={styles.modalCloseBtn}>
            <IconTimes />
          </button>
        </div>
        <p style={styles.modalMessage}>{message}</p>
        <button onClick={onClose} style={styles.modalActionBtn}>Close</button>
      </motion.div>
    </div>
  );
}