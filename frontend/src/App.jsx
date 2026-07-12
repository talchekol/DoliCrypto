import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import "./App.css";
import Watchlist from "./pages/Watchlist/Watchlist";
import {
  login,
  register,
  addFavoriteCoin,
  removeFavoriteCoin,
  getFavoriteCoins,
  getCurrentUser,
} from "./utils/api";

function App() {
  const navigate = useNavigate();

  // --- 👤 סטייט לניהול משתמש מחובר ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  //  : יצירת מערך בסטייט בשם favorites
  const [favorites, setFavorites] = useState([]);

  // --- 🔐 בדיקת חיבור ראשונית וטעינת מועדפים מהדאטה-בייס ---
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsLoggedIn(true);

      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          setCurrentUser(JSON.parse(savedUser));
        } catch (err) {
          console.error("שגיאה בטעינת פרטי המשתמש מהאחסון המקומי:", err);
          localStorage.removeItem("user");
        }
      }

      // 🪙 טעינת המועדפים של המשתמש ישירות מהדאטה-בייס בטעינת האתר
      getFavoriteCoins(jwt)
        .then((coinFavorites) => {
          // נמפה את המבנה שחזר מהמונגו למבנה שהפרונט-אנד שלך מצפה לו (למשל עם id במקום coinId)
          const mappedFavorites = coinFavorites.map((coin) => ({
            _id: coin._id, // נשמור את ה-Mongo ID של הרשומה כדי שנוכל למחוק אותה בקלות
            id: coin.coinId,
            name: coin.name,
            symbol: coin.symbol,
            image: coin.image,
          }));
          setFavorites(mappedFavorites);
        })
        .catch((err) => console.error("שגיאה בטעינת מועדפים מהשרת:", err));
    }
  }, [isLoggedIn]); // ה-useEffect ירוץ מחדש ברגע שמצב ההתחברות משתנה

  // --- 🔄 לוגיקת Toggle מעודכנת מול הדאטה-בייס ---
  const handleToggleFavorite = (coin) => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;

    // בודקים האם המטבע כבר קיים במועדפים של המשתמש
    const existingCoin = favorites.find((fav) => fav.id === coin.id);

    if (existingCoin) {
      // 1. אם המטבע קיים – מוחקים אותו מהדאטה-בייס (באמצעות ה-_id של מונגו)
      removeFavoriteCoin(existingCoin._id, jwt)
        .then(() => {
          // רק לאחר מחיקה מוצלחת בשרת, נסיר מהסטייט ב-React
          setFavorites(favorites.filter((fav) => fav.id !== coin.id));
        })
        .catch((err) => console.error("שגיאה במחיקת מטבע מהדאטה-בייס:", err));
    } else {
      // 2. אם המטבע לא קיים – מוסיפים אותו לדאטה-בייס
      addFavoriteCoin(coin, jwt)
        .then((savedCoin) => {
          // מוסיפים לסטייט את המטבע שנשמר בשרת (כולל ה-_id החדש שמונגו יצר לו)
          const newFavorite = {
            _id: savedCoin._id,
            id: savedCoin.coinId,
            name: savedCoin.name,
            symbol: savedCoin.symbol,
            image: savedCoin.image,
          };
          setFavorites([...favorites, newFavorite]);
        })
        .catch((err) =>
          console.error("error in adding coin to favorites:", err),
        );
    }
  };

  // --- 🔑 פונקציית הרשמה מדף Signup ---
  const handleRegister = (name, email, password) => {
    return register(name, email, password).then((res) => {
      navigate("/login"); // לאחר הרשמה מוצלחת, ננווט לדף ההתחברות
    });
  };

  // --- 🔑 פונקציית התחברות מדף Login ---
  const handleLogin = (email, password) => {
    return login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);

          return getCurrentUser(data.token).then((userData) => {
            localStorage.setItem("user", JSON.stringify(userData));
            setCurrentUser(userData);
            setIsLoggedIn(true);
          });
        }
      })
      .catch((err) => {
        console.error("Login failed:", err);
        throw err; // מאפשר ל-Login.jsx לתפוס את השגיאה ולהציג אותה ב-UI
      });
  };

  // --- 🚪 פונקציית התנתקות ---
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setFavorites([]); // מנקים את המועדפים כדי שלא יישארו למשתמש הבא
  };

  return (
    <div className="app-container">
      {/* ה-Navbar והבאנר מוצגים רק אם המשתמש מחובר */}
      {isLoggedIn && <Navbar onLogout={handleLogout} />}

      <main className="main-content">
        {isLoggedIn && currentUser && (
          <div className="welcome-banner">
            Welcome back, {currentUser.name}!
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />}
          />

          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/home" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/register"
            element={
              isLoggedIn ? (
                <Navigate to="/home" replace />
              ) : (
                <Register onRegister={handleRegister} />
              )
            }
          />

          <Route
            path="/home"
            element={
              isLoggedIn ? (
                <Home
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/watchlist"
            element={
              isLoggedIn ? (
                <Watchlist
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
