import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../components/Loader";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("https://chat-server-d27s.onrender.com/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmail("");
      setPassword("");
    }

    if (response.ok) {
      setError(null);
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      navigate("/chat");
    }
    setLoading(false);
  };

  return (
    <div className="mt-32">
      <header>
        <h2>Login Form</h2>
      </header>
      <main>
        <form
          variants={container}
          initial="hidden"
          animate="visible"
          onSubmit={handleForm}
          onFocus={() => setError(null)}
        >
          <label htmlFor="Email">
            Enter your email:
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter your Email"
            autoComplete="off"
          />
          <label htmlFor="password">
            Enter your password:
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your Password"
          />
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <button>
              Login
            </button>
          )}
        </form>
          {error && (
            <div
            >
              {error}
            </div>
          )}
        <div>
          <h2>Don't have an account?</h2>
          <NavLink to="/signup">
            Signup
          </NavLink>
        </div>
      </main>
    </div>
  );
}
