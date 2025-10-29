import React from "react";
import { motion } from "framer-motion";
import {
  IconWallet,
  IconCopy,
  IconBitcoin,
  IconEthereum,
  IconBinance,
} from "./_icons";

const iconMap = {
  BTC: IconBitcoin,
  ETH: IconEthereum,
  BNB: IconBinance,
};

const calculateTotalValue = (portfolio) =>
  portfolio.reduce((sum, asset) => sum + asset.value, 0);

const formatUSD = (value) =>
  `$${Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function PortfolioCard({ portfolio, handleCopy, copied, btcAddress }) {
  const totalValue = calculateTotalValue(portfolio);
  const hasAssets = totalValue > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="content-card portfolio-card-container"
    >
      <h3 className="card-header-title">
        <IconWallet style={{ marginRight: "10px" }} /> My Portfolio
      </h3>

      {/* Total Account Value */}
      <div className="portfolio-total">
        <p>Total Account Value</p>
        <h3 style={{ color: hasAssets ? "#34d399" : "white" }}>
          {formatUSD(totalValue)}
        </h3>
      </div>

      {/* Show Deposit Section when total is 0 */}
      {!hasAssets ? (
        <div className="btc-deposit-section">
          <p className="deposit-title">BTC Deposit Address</p>
          <div className="address-bar">
            <span className="address-text">{btcAddress}</span>
            <button className="copy-button" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="deposit-hint">
            Please deposit Bitcoin (BTC) to this address to start trading on{" "}
            <strong>Wealth Wave Profit</strong>.
          </p>
        </div>
      ) : (
        // Assets Table (only visible if user has made trades)
        <div className="portfolio-table-wrapper">
          <table className="assets-table">
            <thead>
              <tr>
                <th className="pl-3">ASSET</th>
                <th>AMOUNT</th>
                <th>VALUE (USD)</th>
                <th className="pr-3 text-right">24H</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((asset) => {
                const AssetIcon = iconMap[asset.symbol];
                const changeValue = parseFloat(asset.change24h);
                const isUp = changeValue >= 0;
                const changeText = `${isUp ? "+" : ""}${changeValue.toFixed(2)}%`;

                return (
                  <tr key={asset.id}>
                    <td className="pl-3 coin-name-cell">
                      <span className="coin-icon-wrapper">
                        {AssetIcon && <AssetIcon />}
                      </span>
                      {asset.symbol}
                    </td>
                    <td>{asset.amount.toFixed(4)}</td>
                    <td>{formatUSD(asset.value)}</td>
                    <td className={`pr-3 text-right ${isUp ? "up" : "down"}`}>
                      {isUp ? "▲" : "▼"} {changeText}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
