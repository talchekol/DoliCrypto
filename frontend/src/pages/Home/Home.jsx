import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi"; // אייקון חיפוש מ-Feather
import "./Home.css";
import CryptoCard from "../../components/CryptoCard/CryptoCard"; // ייבוא רכיב כרטיס מטבעות
import { getCoins } from "../../utils/cryptoApi"; // ייבוא הפונקציה שמביאה את המטבעות מ-CoinGecko

function Home({ favorites, onToggleFavorite }) {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getCoins()
      .then((data) => {
        setCoins(data); // שומרים את המטבעות האמיתיים
        setLoading(false); // מכבים את הטעינה
      })
      .catch((err) => {
        console.error("CoinGecko API Error:", err);
        setLoading(false);
      });
  }, []);

  // 🌟 לוגיקת הסינון: מייצרים מערך חדש שמכיל רק מטבעות שמתאימים לטקסט החיפוש
  const filteredCoins = coins.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__hero-content">
          <h1 className="home__hero-title">Track Crypto Assets in Real-Time</h1>
          <p className="home__hero-subtitle">
            Search, track and analyze thousands of cryptocurrencies in
            real-time. Stay ahead of the market.
          </p>
        </div>
        <div className="home__hero-visual">
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>
      {/* 🌟 אזור כרטיסי המטבעות החדש */}
      <section className="home__coins-section">
        <h2 className="home__section-title">Trending Market</h2>
        {loading ? (
          <div className="home__loading">Loading market data...</div>
        ) : (
          <div className="home__coins-grid">
            {/* 🌟 מרנדרים את המערך המסונן (filteredCoins) במקום את המערך המקורי */}
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin) => {
                const isFavorite = favorites
                  ? favorites.some((fav) => fav.id === coin.id)
                  : false;
                return (
                  <CryptoCard
                    key={coin.id}
                    coin={coin}
                    isFavorite={isFavorite}
                    onToggleFavorite={onToggleFavorite}
                  />
                );
              })
            ) : (
              <div className="home__no-results">
                No coins match your search.
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
