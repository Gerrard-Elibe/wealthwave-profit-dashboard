import React from "react";

export default function TradeFormCard({ trade, handleTrade, handleTradeChange, currentPrice, userBalance }) {
  const isBuy = trade.type === "buy";
  
  return (
    <div className="content-card trade-ui">
      <h3>Execute Trade</h3>
      <form onSubmit={handleTrade}>
        <div className="type-toggle">
          <button type="button" className={isBuy ? "active buy" : ""} onClick={() => handleTradeChange({target:{value:"buy"}}, "type")}>BUY</button>
          <button type="button" className={!isBuy ? "active sell" : ""} onClick={() => handleTradeChange({target:{value:"sell"}}, "type")}>SELL</button>
        </div>

        <select value={trade.symbol} onChange={(e) => handleTradeChange(e, "symbol")}>
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="ETH">Ethereum (ETH)</option>
        </select>

        <input 
          type="number" 
          placeholder="Amount" 
          value={trade.amount} 
          onChange={(e) => handleTradeChange(e, "amount")} 
          required 
        />

        <div className="summary">
          <p>Available: <span>${userBalance.toLocaleString()}</span></p>
          <p>Total: <span style={{color: '#00ff88'}}>${trade.total}</span></p>
        </div>

        <button 
          type="submit" 
          className="main-btn" 
          disabled={isBuy && userBalance <= 0}
        >
          {isBuy && userBalance <= 0 ? "Account Not Funded" : `Confirm ${trade.type}`}
        </button>
      </form>
    </div>
  );
}