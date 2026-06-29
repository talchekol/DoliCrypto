import React from "react";
import { FiStar } from "react-icons/fi"; // אייקון כוכב בשביל ה-Watchlist
import "./CryptoCard.css";

function CryptoCard({ coin }) {
  // בודק אם אחוז השינוי חיובי או שלילי כדי לקבוע צבע (ירוק או אדום)
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <div className="crypto-card">
      <div className="crypto-card__header">
        <div className="crypto-card__info">
          <img
            className="crypto-card__image"
            src={coin.image}
            alt={coin.name}
          />
          <div>
            <h3 className="crypto-card__name">{coin.name}</h3>
            <span className="crypto-card__symbol">
              {coin.symbol.toUpperCase()}
            </span>
          </div>
        </div>
        <button
          className="crypto-card__watchlist-btn"
          aria-label="Add to watchlist"
        >
          <FiStar className="crypto-card__watchlist-icon" />
        </button>
      </div>

      <div className="crypto-card__body">
        <div className="crypto-card__price">
          ${coin.current_price.toLocaleString()}
        </div>
        <div
          className={`crypto-card__badge ${isPositive ? "crypto-card__badge--positive" : "crypto-card__badge--negative"}`}
        >
          {isPositive ? "+" : ""}
          {coin.price_change_percentage_24h.toFixed(2)}%
        </div>
      </div>
    </div>
  );
}

export default CryptoCard;
