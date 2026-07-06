import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import "./App.css";
import Watchlist from "./pages/Home/Watchlist/Watchlist";

function App() {
  //  : יצירת מערך בסטייט בשם favorites
  const [favorites, setFavorites] = useState(() => {
    // בדיקה אם יש מועדפים ב-localStorage
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  //  לוגיקה המועדפים-Toggle (הוספה/הסרה)
  const handleToggleFavorite = (coin) => {
    const isExist = favorites.some((fav) => fav.id === coin.id);

    if (isExist) {
      // אם המטבע כבר שם – תסיר אותו
      setFavorites(favorites.filter((fav) => fav.id !== coin.id));
    } else {
      // אם הוא לא במערך – תוסיף אותו
      setFavorites([...favorites, coin]);
    }
  };

  useEffect(() => {
    // שמירת המועדפים ב-localStorage בכל פעם שהם משתנים
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
              path="/home"
              element={
                <Home
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              }
            />
            <Route
              path="/watchlist"
              element={
                <Watchlist
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
