import React from "react";
import { FiSearch } from "react-icons/fi"; // אייקון חיפוש מ-Feather
import "./Home.css";
import CryptoCard from "../../components/CryptoCard/CryptoCard"; // ייבוא רכיב כרטיס מטבעות

const MOCK_COINS = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    current_price: 64250,
    price_change_percentage_24h: 2.45,
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "eth",
    current_price: 3450,
    price_change_percentage_24h: -1.2,
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  },
  {
    id: "binancecoin",
    name: "BNB",
    symbol: "bnb",
    current_price: 580,
    price_change_percentage_24h: 0.85,
    image:
      "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png",
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "sol",
    current_price: 145,
    price_change_percentage_24h: -4.15,
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
  },
];

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home__hero">
        <div className="home__hero-content">
          <h1 className="home__hero-title">Track Crypto Assets in Real-Time</h1>
          <p className="home__hero-subtitle">
            Search, track and analyze thousands of cryptocurrencies in
            real-time. Stay ahead of the market.
          </p>
        </div>
        <div className="home__hero-visual">
          {/* פה בהמשך תוכל לשים תמונת רקע או גרפיקה זורמת של רשת/כדור ארץ כהה */}
          <div className="home__hero-globe">🌐</div>
        </div>
      </section>

      {/* Search Section */}
      <section className="home__search-container">
        <div className="home__search-bar">
          <FiSearch className="home__search-icon" />
          <input
            type="text"
            className="home__search-input"
            placeholder="Search for a coin or token..."
          />
        </div>
      </section>
      {/* 🌟 אזור כרטיסי המטבעות החדש */}
      <section className="home__coins-section">
        <h2 className="home__section-title">Trending Market</h2>
        <div className="home__coins-grid">
          {MOCK_COINS.map((coin) => (
            <CryptoCard key={coin.id} coin={coin} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
