import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";


const styles = (
<style>
  {`
    
    *{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Inter', sans-serif;
      }
    .app-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 100vh;
      background-color: #1a1a2e; /* Deep Dark Background */
      color: #e4e4e7; /* Light text */
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
    }

 
    .sidebar {
      width: 100%;
      flex-shrink: 0;
      background-color: #16213e; 
      border-right: none;
      border-bottom: 1px solid #283049; 
      padding: 0.75rem 1rem; 
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
      position: sticky; 
      top: 0;
      z-index: 10;
    }

    .sidebar-title {
      color: #e94560; 
      margin-bottom: 1.5rem;
      display: none;
    }

    .nav-list {
      display: flex;
      justify-content: space-around;
      align-items: center;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0.5rem; 
      border-radius: 0.5rem;
      transition: all 200ms ease-in-out;
      font-size: 0.875rem;
    }

    .nav-item-active {
      background-color: #e94560;
      color: white;
      box-shadow: 0 10px 15px -3px rgba(233, 69, 96, 0.3), 0 4px 6px -4px rgba(233, 69, 96, 0.3);
    }

    .nav-item-inactive {
      color: #a1a1aa;
    }

    .nav-item-inactive:hover {
      background-color: #283049;
      color: white;
    }

    .nav-icon {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0; 
    }

    .nav-label {
      display: none; 
    }


    .main-content {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }

    .header-section {
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #283049;
    }

    .header-title {
      font-size: 1.5rem; 
      font-weight: 800;
      color: white;
    }

    .header-subtitle {
      color: #a1a1aa;
      margin-top: 0.25rem;
    }


    .grid-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }


    .card {
      background-color: #16213e;
      padding: 1.5rem;
      border-radius: 0.75rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
    }


    .chart-section {
      height: 20rem; 
      width: 100%;
    }

    .chart-info {
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        font-size: 0.875rem;
        color: #a1a1aa;
    }
    .chart-info .price {
        color: white;
        font-weight: 500;
    }
    .chart-info .change {
        color: #10b981; 
        font-weight: 500;
    }


    .trade-form-card {
        height: 100%;
    }
    .trade-toggle {
      display: flex;
      margin-bottom: 1rem;
      padding: 0.25rem;
      background-color: #0f172a; 
      border-radius: 0.5rem;
    }
    .trade-toggle button {
      flex: 1;
      padding: 0.5rem 0;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 200ms ease-in-out;
      border: none;
      cursor: pointer;
    }
    .trade-toggle .buy-active {
      background-color: #10b981; 
      color: white;
      box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
    }
    .trade-toggle .sell-active {
      background-color: #ef4444; 
      color: white;
      box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.3);
    }
    .trade-toggle .buy-inactive, .trade-toggle .sell-inactive {
      color: #94a3b8;
      background-color: transparent;
    }
    .trade-toggle .buy-inactive:hover, .trade-toggle .sell-inactive:hover {
        background-color: #1e293b;
    }

    .trade-form input {
      width: 100%;
      padding: 0.75rem;
      background-color: #283049;
      color: white;
      border-radius: 0.5rem;
      border: 1px solid #475569;
      outline: none;
      transition: border-color 200ms;
      margin-bottom: 1rem;
    }
    .trade-form input:focus {
      border-color: #e94560;
    }

    .trade-estimate {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
      color: #a1a1aa;
      padding-top: 0.5rem;
      padding-bottom: 1rem;
    }
    .trade-estimate strong {
        color: white;
    }

    .trade-form button {
      width: 100%;
      padding: 0.75rem;
      font-weight: bold;
      color: white;
      border-radius: 0.5rem;
      transition: all 200ms ease-in-out;
      border: none;
      cursor: pointer;
    }
    .trade-form .btn-buy {
      background-color: #10b981;
    }
    .trade-form .btn-buy:hover {
      background-color: #059669;
    }
    .trade-form .btn-sell {
      background-color: #ef4444;
    }
    .trade-form .btn-sell:hover {
      background-color: #dc2626;
    }



    .portfolio-total {
        margin-bottom: 1.5rem;
    }
    .portfolio-total p {
        color: #a1a1aa;
    }
    .portfolio-total h3 {
        font-size: 2.25rem;
        font-weight: 700;
        color: #34d399; /* Green for profit/total */
    }

    .btc-address {
        margin-bottom: 1.5rem;
        padding: 1rem;
        background-color: #283049;
        border-radius: 0.5rem;
    }
    .btc-address h4 {
        font-size: 0.875rem;
        font-weight: 500;
        color: white;
        margin-bottom: 0.5rem;
    }
    .address-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .address-bar span {
        font-size: 0.75rem;
        font-family: monospace;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #a1a1aa;
        flex-grow: 1;
        min-width: 0;
        margin-right: 0.5rem;
    }
    .address-bar button {
        display: flex;
        align-items: center;
        padding: 0.25rem 0.75rem;
        font-size: 0.75rem;
        background-color: #e94560;
        color: white;
        border-radius: 9999px; /* Full rounded */
        transition: background-color 200ms;
    }
    .address-bar button:hover {
        background-color: #d11a43;
    }


    .assets-table {
        min-width: 100%;
        text-align: left;
        font-size: 0.875rem;
        color: #a1a1aa;
    }
    .assets-table thead {
        border-bottom: 1px solid #374151;
        text-transform: uppercase;
        font-size: 0.75rem;
        color: #94a3b8;
    }
    .assets-table th {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-right: 0.75rem;
    }
    .assets-table td {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
    }
    .assets-table tbody tr {
        border-bottom: 1px solid rgba(55, 65, 81, 0.5);
    }
    .assets-table tbody tr:hover {
        background-color: rgba(55, 65, 81, 0.2);
    }
    .coin-name {
        display: flex;
        align-items: center;
        font-weight: 500;
        color: white;
    }
    .coin-name span {
        width: 1.25rem;
        height: 1.25rem;
        margin-right: 0.5rem;
    }
    .up {
        color: #10b981;
        font-weight: 500;
    }
    .down {
        color: #ef4444;
        font-weight: 500;
    }
    .text-right {
        text-align: right;
    }
    .px-3 {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
    }
    .pl-3 {
        padding-left: 0.75rem;
    }

    /* Modal Styles */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.85);
      z-index: 50;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }
    .modal-content {
      background-color: #16213e;
      padding: 1.5rem;
      border-radius: 0.75rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      width: 100%;
      max-width: 28rem;
      color: white;
      border-top: 4px solid;
    }
    .border-success { border-color: #10b981; }
    .border-error { border-color: #ef4444; }
    .border-info { border-color: #e94560; }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .modal-icon-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .modal-header h3 {
      font-size: 1.25rem;
      font-weight: 700;
    }
    .modal-close-btn {
      color: #a1a1aa;
      transition: color 200ms, background-color 200ms;
      padding: 0.25rem;
      border-radius: 9999px;
      background: transparent;
      border: none;
      cursor: pointer;
    }
    .modal-close-btn:hover {
      color: white;
      background-color: #283049;
    }
    .modal-close-btn svg {
        width: 1.25rem;
        height: 1.25rem;
    }
    .modal-message {
        color: #a1a1aa;
        white-space: pre-line;
    }
    .modal-action-btn {
        margin-top: 1.5rem;
        width: 100%;
        padding: 0.5rem;
        background-color: #e94560;
        color: white;
        font-weight: 600;
        border-radius: 0.5rem;
        transition: background-color 200ms;
        border: none;
        cursor: pointer;
    }
    .modal-action-btn:hover {
        background-color: #d11a43;
    }


    .icon-success { color: #10b981; }
    .icon-error { color: #ef4444; }
    .icon-info { color: #e94560; }


    @media (min-width: 1024px) {
      .app-container {
        flex-direction: row;
      }
      .sidebar {
        width: 16rem; 
        padding: 1.5rem;
        height: 100vh; 
        position: sticky;
        top: 0;
        border-right: 1px solid #283049; 
        border-bottom: none; 
      }
      .sidebar-title {
        display: block; 
      }
      .nav-list {
        display: block;
        gap: 0;
      }
      .nav-item {
        margin-bottom: 0.75rem;
        padding: 0.5rem 1rem;
        font-size: 1rem;
      }
      .nav-icon {
        margin-right: 0.75rem;
      }
      .nav-label {
        display: inline;
      }
      .main-content {
        padding: 2rem;
      }
      .header-title {
        font-size: 1.875rem; 
      }
      .grid-layout {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      .chart-col-span-2 {
        grid-column: span 2 / span 2;
      }
      .portfolio-col-span-3 {
        grid-column: span 3 / span 3;
      }
      .address-bar span {
        font-size: 0.875rem;
      }
    }
  `}
</style>
);


const IconHome = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconChartLine = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m18 17-6-6-4 4L2 14"/></svg>;
const IconExchange = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 3 4 4-4 4"/><path d="M4 12v3a4 4 0 0 0 4 4h12"/><path d="m8 21-4-4 4-4"/><path d="M20 12V9a4 4 0 0 0-4-4H4"/></svg>;
const IconWallet = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14h.01"/><path d="M7 14h.01"/><path d="M12 14h.01"/><rect width="20" height="15" x="2" y="5" rx="2"/><path d="M2 10h20"/></svg>;
const IconTimes = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const IconCheckCircle = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>;
const IconExclamationTriangle = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.8 18.01C1.65 18.3 1.7 18.6 1.88 18.81C2.07 19.03 2.37 19.14 2.68 19.14H21.32C21.63 19.14 21.93 19.03 22.12 18.81C22.3 18.6 22.35 18.3 22.2 18.01L13.71 3.86C13.56 3.57 13.26 3.42 12.93 3.42H11.07C10.74 3.42 10.44 3.57 10.29 3.86Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;


const IconBTC = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="#f7931a" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-12.5h-2v3h2a1.5 1.5 0 0 0 0-3zm0 4h-2v3h2a1.5 1.5 0 0 0 0-3zm4-4h-2v3h2a1.5 1.5 0 0 0 0-3zm0 4h-2v3h2a1.5 1.5 0 0 0 0-3zm-2-7a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 11a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>;
const IconETH = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="#627eea" viewBox="0 0 24 24"><path d="M12 2L6 12l6 10 6-10-6-10zm0 18l-4-6 4-6 4 6-4 6z"/></svg>;
const IconBNB = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="#f3ba2f" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.73l-1.61 1.61-3.64-3.63L12 16.73zm-4.72-4.73L6 10l3.73-3.73 2.11 2.11-3.73 3.73zm4.72 4.73l2.11-2.11 3.73-3.73-3.73 3.73-2.11 2.11z"/></svg>;



const chartData = [
  { time: "09:00", price: 67100 },
  { time: "10:00", price: 67300 },
  { time: "11:00", price: 66950 },
  { time: "12:00", price: 67420 },
  { time: "13:00", price: 67610 },
  { time: "14:00", price: 67500 },
  { time: "15:00", price: 67440 },
  { time: "16:00", price: 67550 },
  { time: "17:00", price: 67600 },
];


const Modal = ({ isOpen, title, message, onClose, type = "info" }) => {
  if (!isOpen) return null;

  let IconComponent, colorClass;
  switch (type) {
    case "success":
      IconComponent = IconCheckCircle;
      colorClass = "border-success";
      break;
    case "error":
      IconComponent = IconExclamationTriangle;
      colorClass = "border-error";
      break;
    default: 
      IconComponent = IconExclamationTriangle;
      colorClass = "border-info";
  }
  
  const iconColorClass = `icon-${type}`;

  return (
    <div className="modal-backdrop">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`modal-content ${colorClass}`}
      >
        <div className="modal-header">
          <div className="modal-icon-group">
            <IconComponent className={`w-6 h-6 ${iconColorClass}`} />
            <h3 className="modal-title">{title}</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <IconTimes />
          </button>
        </div>
        <p className="modal-message">{message}</p>
        <button
          onClick={onClose}
          className="modal-action-btn"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};


const TradeFormCard = ({ trade, setTrade, handleTrade }) => {
  const isBuy = trade.type === "buy";
  const estimate = (parseFloat(trade.amount) || 0) * (parseFloat(trade.price) || 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="card trade-form-card"
    >
      <h2 className="text-xl font-semibold text-white mb-4">Place a Trade</h2>
      <div className="trade-toggle">
        <button
          onClick={() => setTrade({ ...trade, type: "buy" })}
          className={isBuy ? 'buy-active' : 'buy-inactive'}
        >
          Buy
        </button>
        <button
          onClick={() => setTrade({ ...trade, type: "sell" })}
          className={!isBuy ? 'sell-active' : 'sell-inactive'}
        >
          Sell
        </button>
      </div>

      <form onSubmit={handleTrade} className="trade-form">
        <input
          type="number"
          step="any"
          placeholder={`Amount (${isBuy ? "BTC to Buy" : "BTC to Sell"})`}
          value={trade.amount}
          onChange={(e) => setTrade({ ...trade, amount: e.target.value })}
        />
        <input
          type="number"
          step="any"
          placeholder="Price (USD)"
          value={trade.price}
          onChange={(e) => setTrade({ ...trade, price: e.target.value })}
        />
        <div className="trade-estimate">
          <span>Estimated Total:</span>
          <strong>${estimate.toFixed(2)} USD</strong>
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={isBuy ? 'btn-buy' : 'btn-sell'}
        >
          {isBuy ? "Place Buy Order" : "Place Sell Order"}
        </motion.button>
      </form>
    </motion.div>
  );
};


const PortfolioCard = ({ portfolio, btcAddress, handleCopy, copied }) => {
  const totalValue = portfolio.reduce((sum, coin) => sum + coin.value, 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="card portfolio-card"
    >
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <IconWallet className="mr-2 text-indigo-400 w-5 h-5" style={{ color: '#e94560', marginRight: '0.5rem' }} /> My Portfolio
      </h2>
      <div className="portfolio-total">
        <p>Total Account Value</p>
        <h3>${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
      </div>

      <div className="btc-address">
        <h4>BTC Deposit Address</h4>
        <div className="address-bar">
          <span>{btcAddress}</span>
          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{copied ? "Copied!" : "Copy"}</span>
          </motion.button>
        </div>
      </div>


      <div className="overflow-x-auto">
        <table className="assets-table">
          <thead>
            <tr>
              <th style={{ paddingRight: '0.75rem' }}>Asset</th>
              <th className="px-3">Amount</th>
              <th className="px-3">Value (USD)</th>
              <th className="pl-3 text-right">24H</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map((coin) => (
              <tr key={coin.id}>
                <td className="coin-name">
                  <span className="coin-icon">
                    {coin.symbol === "BTC" && <IconBTC />}
                    {coin.symbol === "ETH" && <IconETH />}
                    {coin.symbol === "BNB" && <IconBNB />}
                  </span>
                  {coin.symbol}
                </td>
                <td className="px-3">{coin.amount.toFixed(4)}</td>
                <td className="px-3">${coin.value.toFixed(2)}</td>
                <td className={`pl-3 text-right ${coin.change.startsWith("+") ? "up" : "down"}`}>
                  {coin.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};



function App() {
  const [copied, setCopied] = useState(false);
  const [trade, setTrade] = useState({ type: "buy", amount: "", price: "" });
  const [messageModal, setMessageModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const btcAddress = "bc1qq22hj0t00uct22me3a4dhw43h56jeny003480z";
  const latestBtcPrice = chartData[chartData.length - 1].price;

  const portfolio = [
    { id: 1, name: "Bitcoin", symbol: "BTC", amount: 0.45, value: latestBtcPrice * 0.45, change: "+2.1%" },
    { id: 2, name: "Ethereum", symbol: "ETH", amount: 1.9, value: 2450 * 1.9, change: "-0.7%" },
    { id: 3, name: "BNB", symbol: "BNB", amount: 3.2, value: 590 * 3.2, change: "+1.5%" },
  ];

  const handleCopy = () => {
    
    const textArea = document.createElement("textarea");
    textArea.value = btcAddress;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    } catch (err) {
        console.error('Fallback: Could not copy text: ', err);
    }
    document.body.removeChild(textArea);
  };

  const closeModal = () => setMessageModal({ isOpen: false });

  const handleTrade = (e) => {
    e.preventDefault();
    const amount = parseFloat(trade.amount);
    const price = parseFloat(trade.price);

    if (isNaN(amount) || isNaN(price) || amount <= 0 || price <= 0) {
      setMessageModal({
        isOpen: true,
        title: "Trade Error",
        message: "Please enter valid, positive values for amount and price.",
        type: "error",
      });
      return;
    }

    const action = trade.type === "buy" ? "Purchase" : "Sale";
    const totalCost = (amount * price).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    setMessageModal({
      isOpen: true,
      title: `${action} Order Placed`,
      message: `Your ${trade.type.toUpperCase()} order for ${amount} BTC at $${price.toLocaleString()} (Total ${totalCost}) was submitted.\n\n⚠️ ACTION REQUIRED: Insufficient funds detected for execution. This is a mock trading app; please note this order is for demonstration only.`,
      type: "info",
    });

    setTrade({ type: "buy", amount: "", price: "" });
  };


  return (
    <>
      {styles} 
      <div className="app-container">
        <Modal {...messageModal} onClose={closeModal} />

        <motion.aside
          className="sidebar"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="sidebar-title">Wealth Wave Profit</h2>
     
          <ul className="nav-list">
            {[{ icon: IconHome, label: "Dashboard" }, { icon: IconChartLine, label: "Markets" }, { icon: IconExchange, label: "Trades" }, { icon: IconWallet, label: "Portfolio" }].map((item, index) => (
              <motion.li
                key={index}
                className={`nav-item ${index === 0 ? 'nav-item-active' : 'nav-item-inactive'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </motion.li>
            ))}
          </ul>
        </motion.aside>

       
        <main className="main-content">
         
          <motion.header
            className="header-section"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="header-title">BTC/USDT Trading View</h1>
            <p className="header-subtitle">Real-time market data and quick trade access.</p>
          </motion.header>

       
          <div className="grid-layout">

           
            <motion.section
              className="card chart-col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-white mb-4">Live Price Chart (1H)</h2>
              <div className="chart-section">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#283049" />
                    <XAxis dataKey="time" stroke="#94a3b8" />
                    <YAxis
                      stroke="#94a3b8"
                      domain={['dataMin - 100', 'dataMax + 100']}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#16213e', border: '1px solid #283049', borderRadius: '8px' }}
                      labelStyle={{ color: '#9ca3af' }}
                      formatter={(value) => [`$${value.toLocaleString()}`, "Price"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6, fill: '#10b981', stroke: '#1a1a2e', strokeWidth: 2 }}
                      animationDuration={1200}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-info">
                  <span>Current Price: <span className="price">${latestBtcPrice.toLocaleString()}</span></span>
                  <span>24H Change: <span className="change">+1.5%</span></span>
              </div>
            </motion.section>


            <motion.section
              className="trade-form-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <TradeFormCard
                  trade={trade}
                  setTrade={setTrade}
                  handleTrade={handleTrade}
              />
            </motion.section>

        
            <motion.section
              className="portfolio-col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <PortfolioCard
                  portfolio={portfolio}
                  btcAddress={btcAddress}
                  handleCopy={handleCopy}
                  copied={copied}
              />
            </motion.section>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
