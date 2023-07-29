import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
            path="/signup"
            element={!user ? <Signup theme={theme} /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login theme={theme} /> : <Navigate to="/login" />}
          />
          <Route
            path="/confirm"
            element={
              !user ? <Confirm theme={theme} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/chat"
            element={user ? <Chat theme={theme} /> : <Navigate to="/chat" />}
          />
          <Route
            path="/profile"
            element={
              user ? <Profile theme={theme} /> : <Navigate to="/profile" />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
