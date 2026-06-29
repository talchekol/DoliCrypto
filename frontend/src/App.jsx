import React from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Home />
      </div>
    </div>
  );
}

export default App;
