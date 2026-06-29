import React from "react";
import { FiStar, FiInfo } from "react-icons/fi";
import "./Watchlist.css";

function Watchlist() {
  return (
    <div className="watchlist">
      <h1 className="watchlist__title">My Watchlist</h1>
      <p className="watchlist__subtitle">
        Track your favorite cryptocurrencies here.
      </p>
      <div className="watchlist__add-container">
        <div className="watchlist__add-paragraph">
          <div className="watchlist__add-header">
            <FiStar className="watchlist__add-icon" />
            <p className="watchlist__add-title">Add to Watchlist</p>
          </div>
          <p className="watchlist__add-caption">
            Click the star icon on the home page to add a cryptocurrency to your
            watchlist and keep track of it.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Watchlist;
