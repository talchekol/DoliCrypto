# 🪙 DoliCrypto //the kalfan

[![React Version](https://img.shields.io/badge/react-v19.0-blue.svg)](https://react.dev/)
[![Vite Version](https://img.shields.io/badge/vite-v8.0-purple.svg)](https://vite.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A real-time cryptocurrency tracker built with **React 19** and the **CoinGecko API**. Browse the top 24 coins by market cap, search instantly by name or symbol, and save your favorites to a personal watchlist with seamless local persistence.

---

## 🚀 Features 

- **📊 Live Market Data** — Fetches up-to-date cryptocurrency prices, market symbols, and 24h percentage changes directly from the CoinGecko public API.
- **🔍 Instant Client-Side Search** — Filter the entire list of coins instantly by name or ticker symbol without triggering redundant network requests.
- **⭐ Persistent Watchlist** — Star any coin to instantly add/remove it from your watchlist. Data is managed via global state and automatically persists across page refreshes using `localStorage`.
- **📱 Premium Responsive Design** — Clean dark-themed user interface featuring a fully responsive navigation bar that collapses into a custom animated hamburger menu on mobile screens.

---

## 🛠️ Tech Stack & Environment

| Tool | Version | Purpose |
| **React** | `^19.2.7` | UI library & state management |
| **Vite** | `^8.1.0` | Ultra-fast development server & production bundler |
| **React Router DOM** | `^7.18.1` | Client-side routing and page management |
| **React Icons** | `^5.6.0` | Feather & Lucide consistent iconography |
| **ESLint** | `^10.5.0` | Code quality enforcement & syntax linting (Flat Config) |
| **CoinGecko API** | `v3` | Public endpoint for cryptocurrency market data |

---

## 📁 Project Structure

```text
src/
├── assets/              # Static images (e.g., DoliNavLogo.png)
├── components/
│   ├── Navbar/          # Navigation bar with dynamic mobile hamburger state
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   └── CryptoCard/      # Reusable UI card for displaying coin statistics and toggle actions
├── pages/
│   ├── Home/            # Landing view — handles data retrieval, search input, and grid layouts
│   └── Watchlist/       # Watchlist view — filters and displays user-starred assets
├── utils/
│   └── cryptoApi.js     # Optimized CoinGecko API fetch wrapper
├── App.jsx              # Application root, routing tables, and synchronized favorites state
└── main.jsx             # React DOM application entry point