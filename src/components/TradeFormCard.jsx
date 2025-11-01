import React from "react";
import { motion } from "framer-motion";

export default function TradeFormCard({
  trade,
  handleTrade,
  handleTradeChange,
  currentPrice,
  userBalance,        // 💰 Pass user's account balance as a prop
  setMessageModal     // 🧾 Optional: for showing success/error messages
}) {

  // Calculate estimated total dynamically
  const estimatedTotal = trade.amount
    ? (parseFloat(trade.amount) * currentPrice).toFixed(2)
    : "0.00";

  // --- VALIDATION BEFORE SUBMITTING TRADE ---
  const handleTradeWithValidation = (e) => {
    e.preventDefault();

    // If user has 0 balance
    if (!userBalance || userBalance <= 0) {
      setMessageModal?.({
        isOpen: true,
        title: "Insufficient Funds",
        message: "You need to deposit funds before making a trade.",
        type: "error"
      });
      return;
    }

    // If trying to buy but not enough balance to cover estimated total
    if (trade.type === "buy" && userBalance < estimatedTotal) {
      setMessageModal?.({
        isOpen: true,
        title: "Insufficient Balance",
        message: `You don’t have enough funds to buy this amount. Available: $${userBalance}`,
        type: "error"
      });
      return;
    }

    // If trying to sell 0 or negative amount
    if (trade.type === "sell" && (!trade.amount || trade.amount <= 0)) {
      setMessageModal?.({
        isOpen: true,
        title: "Invalid Amount",
        message: "Enter a valid amount to sell.",
        type: "error"
      });
      return;
    }

    // Otherwise, process normally
    handleTrade(e);
  };

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
          onClick={() => handleTradeChange({ target: { value: "buy" } }, "type")}
        >
          Buy
        </button>
        <button
          className={trade.type === "sell" ? "active" : ""}
          onClick={() => handleTradeChange({ target: { value: "sell" } }, "type")}
        >
          Sell
        </button>
      </div>

      <form className="trade-form" onSubmit={handleTradeWithValidation}>
        <label className="dashboard-text-label" htmlFor="amount-input">
          Amount (BTC to {trade.type === "buy" ? "Buy" : "Sell"})
        </label>
        <input
          id="amount-input"
          type="number"
          placeholder="0.00000000"
          value={trade.amount}
          onChange={(e) => handleTradeChange(e, "amount")}
          required
        />

        <p
          className="dashboard-text-label"
          style={{ marginTop: "10px", textAlign: "right", color: "#fff" }}
        >
          Estimated Total:{" "}
          <span style={{ color: "#00ff88", fontWeight: "700" }}>
            ${estimatedTotal} USD
          </span>
        </p>

        <button
          type="submit"
          className="submit-trade-btn"
          disabled={!userBalance || userBalance <= 0}
        >
          {userBalance <= 0
            ? "Deposit Funds to Trade"
            : `Place ${trade.type.charAt(0).toUpperCase() + trade.type.slice(1)} Order`}
        </button>
      </form>
    </motion.div>
  );
}
