import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Confirm from "./pages/Confirm";
import Profile from "./pages/Profile"
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import Chat from "./pages/Chat";

export default function App() {
  const { user } = useAuth();
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={!user ? <Landing /> : <Navigate to="/chat" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/chat" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/chat" />} />
        <Route path="/confirm" element={!user ? <Confirm /> : <Navigate to="/chat" />} />
        <Route path="/chat" element={user ? <Chat /> : <Navigate to="/" />} />
        <Route path="/profile" element={user && <Profile />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}
