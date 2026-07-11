import { FiStar } from "react-icons/fi";
import "./Watchlist.css";
import CryptoCard from "../../components/CryptoCard/CryptoCard";

function Watchlist({ favorites, onToggleFavorite }) {
  return (
    <div className="watchlist">
      <h1 className="watchlist__title">My Watchlist</h1>
      <p className="watchlist__subtitle">
        Track your favorite cryptocurrencies here.
      </p>
      {favorites && favorites.length > 0 ? (
        <div className="home__coins-grid">
          {" "}
          {/* משתמשים באותו גריד כדי שהעיצוב יישאר יפה וזהה */}
          {favorites.map((coin) => (
            <CryptoCard
              key={coin.id}
              coin={coin} // מעבירים מטבע בודד מתוך הלולאה!
              isFavorite={true} // הם בטוח מועדפים, כי אנחנו בדף המועדפים
              onToggleFavorite={onToggleFavorite} // השלט הרחוק מוכן למקרה שהמשתמש ירצה להסיר מהמועדפים בדף הזה
            />
          ))}
        </div>
      ) : (
        <div className="watchlist__add-container">
          <div className="watchlist__add-paragraph">
            <div className="watchlist__add-header">
              <FiStar className="watchlist__add-icon" />
              <p className="watchlist__add-title">Add to Watchlist</p>
            </div>
            <p className="watchlist__add-caption">
              Click the star icon on the home page to add a cryptocurrency to
              your watchlist and keep track of it.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Watchlist;
