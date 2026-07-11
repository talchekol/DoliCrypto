export const BASE_URL = "http://localhost:3001";

// פונקציית עזר פנימית לבדיקת תגובת השרת
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
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

// ==========================================
// 🪙 פונקציות מטבעות מועדפים (Coins API)
// ==========================================

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
