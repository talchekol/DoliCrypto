import React from "react";
import { FiSearch } from "react-icons/fi"; // אייקון חיפוש מ-Feather
import "./Home.css";

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
    </div>
  );
}

export default Home;
