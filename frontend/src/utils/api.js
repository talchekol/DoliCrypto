// כתובת ה-API של השרת שלנו (backend)
const BASE_URL = "https://dolicrypto-backend.onrender.com";

// פונקציית עזר פנימית לבדיקת תגובת השרת
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res
    .json()
    .catch(() => ({}))
    .then((data) =>
      Promise.reject(new Error(data.message || `Error: ${res.status}`)),
    );
};

// ==========================================
// 🔐 פונקציות אימות ומשתמשים (Auth)
// ==========================================

// 1. בקשת הרשמה (Signup)
export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);
};

// 2. בקשת התחברות (Signin)
export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

// 3. בקשת פרטי המשתמש הנוכחי (Get Current User)
export const getCurrentUser = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

// ==========================================
// 🪙 פונקציות מטבעות מועדפים (Coins API)
// ==========================================

// 3. קבלת רשימת המטבעות המועדפים של המשתמש (GET /coins)
export const getFavoriteCoins = (token) => {
  return fetch(`${BASE_URL}/coins`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

// שמירת מטבע חדש בדאטה-בייס (POST /coins)
export const addFavoriteCoin = (coin, token) => {
  // נשלח בדיוק את השדות שהשרת שלנו (וה-Joi/Celebrate) מצפים לקבל ב-body
  return fetch(`${BASE_URL}/coins`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      coinId: coin.id, // ה-id שמגיע מה-API החיצוני (למשל 'bitcoin')
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
    }),
  }).then(checkResponse);
};

// 5. מחיקת מטבע מהדאטה-בייס (DELETE /coins/:coinId)
export const removeFavoriteCoin = (mongoId, token) => {
  // שים לב שכאן אנחנו מעבירים את ה-_id המיוחד שמונגו יצר למטבע בדאטה-בייס!
  return fetch(`${BASE_URL}/coins/${mongoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
