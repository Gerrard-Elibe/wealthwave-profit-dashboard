import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ChartCard from "./ChartCard"; 
import TradeFormCard from "./TradeFormCard";
import PortfolioCard from "./PortfolioCard"; 
import ProfileCard from "./ProfileCard";
import { initialPortfolio } from "../data/portfolioData";
import { chartData } from "../data/chartData";
import { IconHome, IconExchange, IconWallet, IconUser, IconArrowUp } from "./_icons"; // ✅ Added IconArrowUp
import "../styles/Dashboard.css";

const DEPOSIT_BTC_ADDRESS = "bc1qq22hj0t00uct22me3a4dhw43h56jeny003480z";

export default function Dashboard({ userData, setUserData, setMessageModal }) {
    const [currentPage, setCurrentPage] = useState("Home");
    const initialBtcPrice = chartData[chartData.length - 1].price || 100450; 
    const initialEthPrice = 4000; 

    const [portfolio, setPortfolio] = useState(() => {
        const stored = localStorage.getItem("mock_portfolio");
        if (stored) return JSON.parse(stored);
        return initialPortfolio.map(asset => ({
            ...asset,
            amount: 0,
            value: 0,
            currentPrice:
                asset.symbol === "BTC"
                    ? initialBtcPrice
                    : asset.symbol === "ETH"
                    ? initialEthPrice
                    : asset.currentPrice,
        }));
    });

    const [trade, setTrade] = useState({
        type: "buy",
        amount: "",
        total: "",
        price: String(initialBtcPrice),
        coin: "BTC",
    });

    const [copied, setCopied] = useState(false);
    const [userId] = useState(
        userData.id ||
            (crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()))
    );

    const [cryptoData, setCryptoData] = useState({
        BTC: { price: initialBtcPrice, change: 0.15 },
        ETH: { price: initialEthPrice, change: -0.79 },
    });
    const [shimmering, setShimmering] = useState(false);

    useEffect(() => {
        localStorage.setItem("mock_portfolio", JSON.stringify(portfolio));
    }, [portfolio]);

    useEffect(() => {
        const fetchPrices = async () => {
            setShimmering(true);
            const newBtcPrice = chartData[chartData.length - 1].price;
            const mockBtcChange = (
                ((newBtcPrice - chartData[0].price) / chartData[0].price) *
                100
            ).toFixed(2);
            const newEthPrice = initialEthPrice;
            const mockEthChange = -0.79;
            const newCryptoData = {
                BTC: { price: newBtcPrice, change: parseFloat(mockBtcChange) },
                ETH: { price: newEthPrice, change: mockEthChange },
            };
            setCryptoData(newCryptoData);
            setTrade(prev => ({ ...prev, price: String(newBtcPrice) }));
            setPortfolio(prev =>
                prev.map(asset => {
                    const data = newCryptoData[asset.symbol] || {
                        price: asset.currentPrice,
                        change: asset.change24h,
                    };
                    return {
                        ...asset,
                        currentPrice: data.price,
                        value: asset.amount * data.price,
                        change24h: data.change,
                    };
                })
            );
            setTimeout(() => setShimmering(false), 800);
        };
        fetchPrices();
        const interval = setInterval(fetchPrices, 60000);
        return () => clearInterval(interval);
    }, []);

    const calculateTotal = btcAmount => {
        const currentPrice = parseFloat(trade.price) || cryptoData.BTC.price;
        const amount = parseFloat(btcAmount);
        if (isNaN(amount) || amount <= 0) return "";
        return (amount * currentPrice)
            .toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })
            .replace(/,/g, "");
    };

    const calculateAmount = usdTotal => {
        const currentPrice = parseFloat(trade.price) || cryptoData.BTC.price;
        const total = parseFloat(usdTotal);
        if (isNaN(total) || total <= 0 || currentPrice === 0) return "";
        return (total / currentPrice).toFixed(8);
    };

    const handleTradeChange = (e, field) => {
        const value = e.target.value;
        setTrade(prevTrade => {
            let newTrade = { ...prevTrade };
            if (field === "amount") {
                newTrade.amount = value;
                newTrade.total = calculateTotal(value);
            } else if (field === "total") {
                newTrade.total = value;
                newTrade.amount = calculateAmount(value);
            } else if (field === "type") {
                newTrade.type = value;
            }
            return newTrade;
        });
    };

    const handleTrade = e => {
        e.preventDefault();
        const amount = parseFloat(trade.amount);
        const price = parseFloat(trade.price);
        if (amount <= 0 || isNaN(amount)) {
            setMessageModal({
                isOpen: true,
                title: "Invalid Trade",
                message: "Please enter a valid, positive amount for the BTC quantity.",
                type: "error",
            });
            return;
        }

        const cost = amount * price;
        let tradeSuccess = false;

        setPortfolio(prevPortfolio => {
            const newPortfolio = prevPortfolio.map(c => ({ ...c }));
            let idx = newPortfolio.findIndex(c => c.symbol === "BTC");
            if (idx === -1) {
                if (trade.type === "sell") return prevPortfolio;
                newPortfolio.push({
                    id: "BTC",
                    symbol: "BTC",
                    amount: amount,
                    currentPrice: price,
                    value: cost,
                    change24h: cryptoData.BTC.change,
                });
                tradeSuccess = true;
            } else {
                const current = newPortfolio[idx].amount;
                const newAmount =
                    trade.type === "buy" ? current + amount : current - amount;
                if (trade.type === "sell" && newAmount < 0) {
                    setMessageModal({
                        isOpen: true,
                        title: "Sell Failed",
                        message:
                            "Insufficient BTC balance to complete the sell order.",
                        type: "error",
                    });
                    return prevPortfolio;
                }
                newPortfolio[idx].amount = newAmount;
                newPortfolio[idx].value = newAmount * price;
                tradeSuccess = true;
            }
            return newPortfolio;
        });

        if (tradeSuccess) {
            const verb = trade.type === "buy" ? "Buy" : "Sell";
            setMessageModal({
                isOpen: true,
                title: `${verb} Order Placed`,
                message: `Successfully placed an order to ${trade.type} ${amount.toFixed(
                    8
                )} BTC for $${cost.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}.`,
                type: "success",
            });
            setTrade(p => ({ ...p, amount: "", total: "" }));
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(DEPOSIT_BTC_ADDRESS);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleLogout = () => setUserData(null);

    const renderContent = () => {
        const currentPrice = trade.price || cryptoData.BTC.price;

        switch (currentPage) {
            case "Home":
                return (
                    <div className="content-wrapper home-section">
                        <h2>Wealth Wave Profit Overview</h2>
                        <div className="crypto-cards">
                            {["BTC", "ETH"].map(coin => (
                                <div
                                    key={coin}
                                    className={`crypto-card ${shimmering ? "shimmer" : ""}`}
                                >
                                    <h3>{coin}</h3>
                                    <p className="price">
                                        ${cryptoData[coin].price.toLocaleString()}
                                    </p>
                                    <p
                                        className={`change ${
                                            cryptoData[coin].change >= 0
                                                ? "positive"
                                                : "negative"
                                        }`}
                                    >
                                        {cryptoData[coin].change >= 0 ? "▲" : "▼"}{" "}
                                        {Math.abs(cryptoData[coin].change)}%
                                        <span className="period"> (24h)</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="grid-layout">
                            <ChartCard
                                currentBtcPrice={cryptoData.BTC.price}
                                btc24hChange={cryptoData.BTC.change}
                            />
                            <TradeFormCard
                                trade={trade}
                                handleTrade={handleTrade}
                                handleTradeChange={handleTradeChange}
                                currentPrice={currentPrice}
                            />
                        </div>
                    </div>
                );

            case "Trade":
                return (
                    <div className="content-wrapper trade-only-section">
                        <h2>Place Trade Order</h2>
                        <div className="grid-layout trade-single-column">
                            <TradeFormCard
                                trade={trade}
                                handleTrade={handleTrade}
                                handleTradeChange={handleTradeChange}
                                currentPrice={currentPrice}
                            />
                        </div>
                    </div>
                );

            case "Wallet":
                return (
                    <div className="content-wrapper wallet-section">
                        <h2>Your Portfolio</h2>
                        <div className="grid-layout portfolio-col-span-3">
                            <PortfolioCard
                                portfolio={portfolio}
                                handleCopy={handleCopy}
                                copied={copied}
                                btcAddress={DEPOSIT_BTC_ADDRESS}
                            />
                        </div>
                    </div>
                );

            case "Deposit":
                return (
                    <div className="content-wrapper deposit-section">
                        <h2>Deposit Funds</h2>
                        <p>Send Bitcoin to this address to deposit into your wallet:</p>
                        <div className="btc-address">{DEPOSIT_BTC_ADDRESS}</div>
                        <button onClick={handleCopy}>
                            {copied ? "Copied!" : "Copy Address"}
                        </button>
                        <p className="info">
                            Please send only BTC to this address. Deposits will appear after
                            network confirmations.
                        </p>
                    </div>
                );

            /** ✅ NEW WITHDRAWAL PAGE **/
            case "Withdraw":
                return (
                    <div className="content-wrapper withdraw-section">
                        <h2>Withdraw Funds</h2>
                        <p>To withdraw your Bitcoin, please enter your BTC address:</p>
                        <form
                            className="withdraw-form"
                            onSubmit={e => {
                                e.preventDefault();
                                setMessageModal({
                                    isOpen: true,
                                    title: "Withdrawal Requested",
                                    message:
                                        "Your withdrawal request has been submitted successfully.",
                                    type: "success",
                                });
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Enter BTC wallet address"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Enter amount in BTC"
                                min="0.0001"
                                step="0.0001"
                                required
                            />
                            <button type="submit">Submit Withdrawal</button>
                        </form>
                        <p className="info">
                            Withdrawals are processed within 24 hours. Make sure your address
                            is correct.
                        </p>
                    </div>
                );

            case "Profile":
                return (
                    <div className="content-wrapper profile-section">
                        <h2>User Profile</h2>
                        <div className="grid-layout">
                            <ProfileCard userData={userData} userId={userId} />
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    /** ✅ Updated Nav items to include Withdraw */
    const navItems = [
        { name: "Home", icon: IconHome },
        { name: "Trade", icon: IconExchange },
        { name: "Wallet", icon: IconWallet },
        { name: "Deposit", icon: IconWallet },
        { name: "Withdraw", icon: IconArrowUp },
        { name: "Profile", icon: IconUser },
    ];

    return (
        <div className="dashboard-container">
            <motion.div
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="sidebar"
            >
                <div className="sidebar-header">
                    <h2 className="logo">Wealth Wave Profit</h2>
                    <button className="logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                <ul className="nav-list">
                    {navItems.map(item => (
                        <li
                            key={item.name}
                            className={`nav-item ${
                                currentPage === item.name ? "active" : ""
                            }`}
                            onClick={() => setCurrentPage(item.name)}
                        >
                            <item.icon className="nav-icon" />
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
                <p className="user-id">
                    Logged in as: <br />
                    <span>{userId}</span>
                </p>
            </motion.div>

            <div className="main-section">
                <header className="header">
                    <h1>{currentPage}</h1>
                    <p>Welcome back, {userData.name}!</p>
                </header>
                {renderContent()}
            </div>
        </div>
    );
}
