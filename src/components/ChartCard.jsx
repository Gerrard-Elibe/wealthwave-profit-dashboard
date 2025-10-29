import React from "react";
import { motion } from "framer-motion";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { chartData } from "../data/chartData";
import "../styles/Dashboard.css"; 

// Component now accepts props for live BTC data
export default function ChartCard({ currentBtcPrice, btc24hChange }) {

  // Use the prop for the current price, falling back to the last data point
  const displayedPrice = currentBtcPrice || chartData[chartData.length - 1].price;
  
  // Use the prop for 24h change, falling back to calculation from mock data
  const isUp = btc24hChange >= 0;
  const percentChange = Math.abs(btc24hChange || 
    ((displayedPrice - chartData[0].price) / chartData[0].price) * 100
  ).toFixed(2);
  
  // Chart Colors for Purple Theme
  const strokeColor = isUp ? "#6a5af9" : "#ff4d6d"; 

  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.2 }} 
      className="content-card chart-card" // Updated class name for consistency
    >
      <h2 className="header-title">Bitcoin (BTC/USD)</h2>
      <div className="chart-info">
        <div>
          {/* Display the LIVE current price */}
          <span className="text-xl font-bold price" style={{ fontSize: '1.8rem', fontWeight: 700 }}>
                ${displayedPrice.toLocaleString()}
            </span>
          
          {/* Display the LIVE 24h change */}
          <span className={`ml-3 ${isUp ? "positive" : "negative"} change`} style={{ fontSize: '1.1rem', fontWeight: 600, marginLeft: '10px' }}>
            {isUp ? `+${percentChange}%` : `${percentChange}%`}
          </span>
        </div>
        <span className="text-sm text-gray-400">9-Hour Performance</span>
      </div>
      <div className="chart-section mt-4" style={{ height: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#a1a1aa" tick={{ fontSize: 12 }} />
            <YAxis 
              domain={["dataMin - 100", "dataMax + 100"]} 
              // Formats Y-Axis to display price with 'K' suffix for better readability (e.g., $100K)
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} 
              stroke="#a1a1aa" 
              tick={{ fontSize: 12 }} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: "#160032", borderColor: "#6a5af9", borderRadius: "0.5rem", color: "white" }} 
              formatter={(value, name, props) => [`$${value.toLocaleString()}`, props.payload.time]} 
              labelFormatter={(label) => `Time: ${label}`} 
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={strokeColor} 
              strokeWidth={2} 
              dot={false} 
              activeDot={{ r: 6, fill: strokeColor, strokeWidth: 1 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}