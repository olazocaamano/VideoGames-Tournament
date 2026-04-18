/*
    File: App.jsx
    Description: Main application routing configuration using react-router-dom.
    Defines all the routes for the system including admin and player modules.
 */


import React from "react";
import { Routes, Route } from "react-router-dom";

// Aplication pages
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Player from "./pages/Player";
import AdminLogin from "./pages/AdminLogin";
import UserRegister from "./pages/UserRegister";

// Global styles
import "./App.css";

/*
    Main App component
    Handles navigation between all application pages
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/player" element={<Player />} />
    </Routes>
  );
}

export default App;