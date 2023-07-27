import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Confirm from "./pages/Confirm";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import Chat from "./pages/Chat";

export default function App() {
  const { user } = useAuth();
  const [theme, setTheme] = useState("light");
  return (
    <div
      className={
        theme === "dark"
          ? "h-full w-full bg-black text-black fixed transition-all duration-700 ease-in-out"
          : "h-full w-full bg-white text-black fixed transition-all duration-700 ease-in-out"
      }
    >
      <BrowserRouter>
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route
            path="/"
            element={!user ? <Landing theme={theme} /> : <Navigate to="/chat" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/chat" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/chat" />}
          />
          <Route
            path="/confirm"
            element={!user ? <Confirm /> : <Navigate to="/chat" />}
          />
          <Route path="/chat" element={user ? <Chat /> : <Navigate to="/" />} />
          <Route path="/profile" element={user && <Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
