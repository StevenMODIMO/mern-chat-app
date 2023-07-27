import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../components/Loader";

const container = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
};

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("https://chat-server-d27s.onrender.com/api/user/validate", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setUsername("");
      setEmail("");
      setPassword("");
    }

    if (response.ok) {
      setError(null);
      localStorage.setItem("OTV", JSON.stringify(json));
      navigate("/confirm");
    }
    setLoading(false);
  };

  return (
    <div className="mt-32">
      <header>
        <h2>Signup Now</h2>
      </header>
      <main>
        <form
          onSubmit={handleForm}
          onFocus={() => setError(null)}
        >
          <label htmlFor="Name">
            Enter your username:
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="@username"
            autoComplete="off"
          />
          <label htmlFor="Email">
            Enter your email:
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your Email"
            autoComplete="off"
          />
          <label htmlFor="password">
            Enter your password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
          />
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <button>
              Signup
            </button>
          )}
        </form>
          {error && (
            <div
            >
              {error}
            </div>
          )}
      </main>
    </div>
  );
}
