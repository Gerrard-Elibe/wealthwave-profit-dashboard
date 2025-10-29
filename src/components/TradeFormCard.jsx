import React from "react";
import { motion } from "framer-motion";

export default function TradeFormCard({ trade, handleTrade, handleTradeChange, currentPrice }) {
  // Calculates estimatedTotal: returns "0.00" if trade.amount is "" or 0.
  const estimatedTotal = trade.amount 
    ? (parseFloat(trade.amount) * currentPrice).toFixed(2)
    : "0.00"; 

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="content-card trade-form-card"
    >
      <h3 className="header-title">Place a Trade</h3>
      
      <div className="trade-type-buttons">
        <button
          className={trade.type === "buy" ? "active" : ""}
          onClick={() => handleTradeChange({target: { value: "buy" }}, 'type')}
        >
          Buy
        </button>
        <button
          className={trade.type === "sell" ? "active" : ""}
          onClick={() => handleTradeChange({target: { value: "sell" }}, 'type')}
        >
          Sell
        </button>
      </div>

      <form className="trade-form" onSubmit={handleTrade}>
        <label className="dashboard-text-label" htmlFor="amount-input">
          Amount (BTC to {trade.type === "buy" ? "Buy" : "Sell"})
        </label>
        <input
          id="amount-input"
          type="number"
          placeholder="0.00000000"
          value={trade.amount} 
          onChange={(e) => handleTradeChange(e, 'amount')}
          required
        />

        <p className="dashboard-text-label" style={{ marginTop: '10px', textAlign: 'right', color: '#fff' }}>
          Estimated Total: <span style={{ color: '#00ff88', fontWeight: '700' }}>${estimatedTotal} USD</span>
        </p>
        
        <button type="submit" className="submit-trade-btn">
          Place {trade.type.charAt(0).toUpperCase() + trade.type.slice(1)} Order
        </button>
      </form>
    </motion.div>
  );
}