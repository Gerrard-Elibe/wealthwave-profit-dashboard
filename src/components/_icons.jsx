import React from 'react';

// === NAVIGATION ICONS ===

export const IconHome = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" height="24" viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
        strokeLinejoin="round" className="feather feather-home" {...props}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

export const IconExchange = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" height="24" viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
        strokeLinejoin="round" className="feather feather-repeat" {...props}>
        <polyline points="17 1 21 5 17 9"></polyline>
        <path d="M21 5H3v6"></path>
        <polyline points="7 23 3 19 7 15"></polyline>
        <path d="M3 19h18v-6"></path>
    </svg>
);

export const IconWallet = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" height="24" viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
        strokeLinejoin="round" className="feather feather-credit-card" {...props}>
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
);

export const IconUser = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" height="24" viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
        strokeLinejoin="round" className="feather feather-user" {...props}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

// === PORTFOLIO ICONS (COINS & UTILITY) ===

export const IconCopy = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" height="24" viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
        strokeLinejoin="round" className="feather feather-copy" {...props}>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);

// Mock Crypto Icons (using simple geometric shapes for representation)
export const IconBitcoin = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" height="24" viewBox="0 0 24 24" fill="#F7931A" 
        stroke="#F7931A" strokeWidth="2" strokeLinecap="round" 
        strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M10 16.5l2-2 2 2" stroke="white" strokeWidth="1.5"></path>
        <path d="M12 7.5v9" stroke="white" strokeWidth="1.5"></path>
        <path d="M14 10.5h-4" stroke="white" strokeWidth="1.5"></path>
        <path d="M14 13.5h-4" stroke="white" strokeWidth="1.5"></path>
    </svg>
);

export const IconEthereum = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" height="24" viewBox="0 0 24 24" fill="#627EEA" 
        stroke="#627EEA" strokeWidth="2" strokeLinecap="round" 
        strokeLinejoin="round" {...props}>
        <polygon points="12 2 2 12 12 22 22 12 12 2"></polygon>
        <polygon points="12 5 5 12 12 19 19 12 12 5" fill="white" opacity="0.4"></polygon>
    </svg>
);

export const IconBinance = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" height="24" viewBox="0 0 24 24" fill="#F3BA2F" 
        stroke="#F3BA2F" strokeWidth="2" strokeLinecap="round" 
        strokeLinejoin="round" {...props}>
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="4" x2="12" y2="20" stroke="white" strokeWidth="1.5"></line>
        <line x1="4" y1="12" x2="20" y2="12" stroke="white" strokeWidth="1.5"></line>
    </svg>
);