import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom"; // 👈 משתמשים ב-HashRouter בשביל הגיטהאב
import App from "./App.jsx"; // 👈 הנתיב לקובץ ה-App שלך
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);
