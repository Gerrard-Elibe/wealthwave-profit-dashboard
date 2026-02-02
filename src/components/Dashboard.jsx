import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IconHome, IconArrowsExchange, IconWallet, IconUser, IconArrowUp, 
  IconCopy, IconCheck, IconLogout 
} from "@tabler/icons-react"; 
import "../styles/Dashboard.css";

// --- SUB-COMPONENTS ---

const CopyToast = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
        className="copy-toast"
      >
        <IconCheck size={18} /> Address Copied
      </motion.div>
    )}
  </AnimatePresence>
);

const Modal = ({ isOpen, onClose, title, message, type }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="modal-overlay">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className={`modal-content ${type}`}>
          <h3>{title}</h3>
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const TradeFormCard = ({ trade, handleTrade, handleTradeChange, portfolio, userBalance }) => {
  const selectedAsset = portfolio.find(a => a.symbol === trade.symbol) || portfolio[0];
  const isBuy = trade.type === "buy";

  return (
    <div className="trade-form-card">
      <h3>Market Execution</h3>
      <div className="trade-type-buttons">
        <button className={isBuy ? "active buy-tab" : ""} onClick={() => handleTradeChange({target:{value:"buy"}}, "type")}>BUY</button>
        <button className={!isBuy ? "active sell-tab" : ""} onClick={() => handleTradeChange({target:{value:"sell"}}, "type")}>SELL</button>
      </div>

      <div className="trade-form">
        <div className="input-group">
          <label className="dashboard-text-label">Select Asset</label>
          <div className="custom-select-wrapper">
            <select value={trade.symbol} onChange={(e) => handleTradeChange(e, "symbol")} className="styled-select">
              {portfolio.map(coin => <option key={coin.symbol} value={coin.symbol}>{coin.name} ({coin.symbol})</option>)}
            </select>
          </div>
        </div>

        <div className="input-group">
          <label className="dashboard-text-label">Amount</label>
          <input type="number" step="0.0001" value={trade.amount} onChange={(e) => handleTradeChange(e, "amount")} placeholder="0.00" />
        </div>

        <div className="trade-summary">
          <div className="summary-row">
            <span>Price:</span> 
            <span>${selectedAsset.currentPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
          </div>
          <div className="summary-row">
            <span>Total Est:</span> 
            <span className="est-value">${trade.total}</span>
          </div>
        </div>

        <button className="submit-trade-btn" onClick={handleTrade} disabled={isBuy && userBalance <= 0}>
          {isBuy && userBalance <= 0 ? "Deposit Required" : `Confirm ${trade.type.toUpperCase()} ${trade.symbol}`}
        </button>
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD ---

export default function Dashboard({ userData, setUserData }) {
  const [currentPage, setCurrentPage] = useState("Home");
  const [usdBalance, setUsdBalance] = useState(0.00); 
  const [showCopyToast, setShowCopyToast] = useState(false);
  
  const [portfolio, setPortfolio] = useState([
    { id: "BTC", symbol: "BTC", name: "Bitcoin", amount: 0, currentPrice: 98450.25, change: 1.45 },
    { id: "ETH", symbol: "ETH", name: "Ethereum", amount: 0, currentPrice: 3120.80, change: -0.82 },
    { id: "BNB", symbol: "BNB", name: "Binance Coin", amount: 0, currentPrice: 645.15, change: 0.35 }
  ]);

  const [trade, setTrade] = useState({ type: "buy", symbol: "BTC", amount: "", total: "0.00" });
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", type: "success" });

  useEffect(() => {
    const simulateMarket = setInterval(() => {
      setPortfolio(prev => prev.map(asset => {
        const move = (Math.random() - 0.5) * (asset.currentPrice * 0.0003);
        return {
          ...asset,
          currentPrice: asset.currentPrice + move,
          change: asset.change + (Math.random() - 0.5) * 0.02
        };
      }));
    }, 4000);
    return () => clearInterval(simulateMarket);
  }, []);

  const copyAddress = () => {
    navigator.clipboard.writeText("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
    setShowCopyToast(true);
    setTimeout(() => setShowCopyToast(false), 3000);
  };

  const handleTradeChange = (e, field) => {
    const val = e.target.value;
    setTrade(prev => {
      let updated = { ...prev, [field]: val };
      const asset = portfolio.find(a => a.symbol === updated.symbol);
      updated.total = updated.amount ? (parseFloat(updated.amount) * (asset?.currentPrice || 0)).toFixed(2) : "0.00";
      return updated;
    });
  };

  const executeTrade = () => {
    const cost = parseFloat(trade.total);
    if (trade.type === "buy") {
      if (usdBalance < cost) return setModal({ isOpen: true, title: "Declined", message: "Insufficient Funds.", type: "error" });
      setUsdBalance(b => b - cost);
      setPortfolio(p => p.map(a => a.symbol === trade.symbol ? { ...a, amount: a.amount + parseFloat(trade.amount) } : a));
    } else {
      const asset = portfolio.find(a => a.symbol === trade.symbol);
      if (asset.amount < parseFloat(trade.amount)) return setModal({ isOpen: true, title: "Declined", message: "Insufficient Crypto.", type: "error" });
      setUsdBalance(b => b + cost);
      setPortfolio(p => p.map(a => a.symbol === trade.symbol ? { ...a, amount: a.amount - parseFloat(trade.amount) } : a));
    }
    setModal({ isOpen: true, title: "Order Executed", message: "Your trade was successful.", type: "success" });
    setTrade({ ...trade, amount: "", total: "0.00" });
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-top">
          <h2 className="logo">WEALTH WAVE</h2>
          <ul className="nav-list">
            <li className={`nav-item ${currentPage === "Home" ? "active" : ""}`} onClick={() => setCurrentPage("Home")}><IconHome size={22}/> <span>Home</span></li>
            <li className={`nav-item ${currentPage === "Trade" ? "active" : ""}`} onClick={() => setCurrentPage("Trade")}><IconArrowsExchange size={22}/> <span>Trade</span></li>
            <li className={`nav-item ${currentPage === "Wallet" ? "active" : ""}`} onClick={() => setCurrentPage("Wallet")}><IconWallet size={22}/> <span>Wallet</span></li>
            <li className={`nav-item ${currentPage === "Deposit" ? "active" : ""}`} onClick={() => setCurrentPage("Deposit")}><IconArrowUp size={22}/> <span>Deposit</span></li>
          </ul>
        </div>
        <div className="sidebar-footer">
          <div className="user-id">ID: <span>{userData?.id || "WW-88291"}</span></div>
          <button className="logout" onClick={() => setUserData(null)}><IconLogout size={18}/> Sign Out</button>
        </div>
      </aside>

      <main className="main-section">
        <header className="header">
          <div className="header-titles">
            <h1>{currentPage}</h1>
            <p className="market-status">Live Market Data</p>
          </div>
          <div className="header-user"><IconUser size={28} color="#c7b7ff"/></div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div key={currentPage} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
            
            {currentPage === "Home" && (
              <div className="home-content">
                <div className="crypto-cards">
                  <div className="crypto-card highlight-card">
                    <p className="dashboard-text-label">Available USD</p>
                    <p className="price balance-green">${usdBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                  </div>
                  {portfolio.map(coin => (
                    <div className="crypto-card" key={coin.symbol}>
                      <h3>{coin.symbol}/USD</h3>
                      <p className="price">${coin.currentPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                      <span className={coin.change >= 0 ? "positive" : "negative"}>
                        {coin.change >= 0 ? "+" : ""}{coin.change.toFixed(2)}%
                      </span>
                    </div>
                  ))}
                </div>
                <div className="centered-trade-container">
                    <TradeFormCard trade={trade} handleTrade={executeTrade} handleTradeChange={handleTradeChange} portfolio={portfolio} userBalance={usdBalance} />
                </div>
              </div>
            )}

            {currentPage === "Trade" && (
               <div className="centered-view">
                 <TradeFormCard trade={trade} handleTrade={executeTrade} handleTradeChange={handleTradeChange} portfolio={portfolio} userBalance={usdBalance} />
               </div>
            )}

            {currentPage === "Wallet" && (
              <div className="portfolio-view content-card">
                <div className="portfolio-header">
                  <p className="dashboard-text-label">Estimated Assets</p>
                  <h3>${portfolio.reduce((acc, curr) => acc + (curr.amount * curr.currentPrice), 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
                </div>
                <table className="assets-table">
                  <thead><tr><th>Asset</th><th>Balance</th><th>Value</th></tr></thead>
                  <tbody>
                    {portfolio.map(a => (
                      <tr key={a.id}>
                        <td><strong>{a.name}</strong></td>
                        <td>{a.amount.toFixed(4)} {a.symbol}</td>
                        <td className="positive">${(a.amount * a.currentPrice).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {currentPage === "Deposit" && (
              <div className="deposit-view content-card">
                <h2>Fund Account</h2>
                <p className="dashboard-text-label">Transfer BTC to the secure address below.</p>
                <div className="styled-address-container">
                  <div className="address-wrapper">
                    <code className="address-text">1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</code>
                  </div>
                  <button onClick={copyAddress} className="copy-btn-styled">
                    <IconCopy size={18} />
                  </button>
                </div>
                <div className="info-box-styled">Min: 0.001 BTC | Speed: 15-30 Mins</div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      <CopyToast show={showCopyToast} />
      <Modal {...modal} onClose={() => setModal({...modal, isOpen: false})} />
    </div>
  );
}