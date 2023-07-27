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
    <div className="h-screen -mt-2 lg:mt-20 bg-gray-900 text-black">
      <header className="text-center text-white text-3xl mt-2">
        <h2>Signup Now</h2>
      </header>
      <main className="flex flex-col items-center">
        <motion.form
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-2 text-xl mt-2 p-4 bg-gray-800 rounded"
          onSubmit={handleForm}
          onFocus={() => setError(null)}
        >
          <label htmlFor="Name" className="text-blue-500">
            Enter your username:
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="@username"
            autoComplete="off"
            className="border-2 border-blue-500 rounded shadow-sm mb-4 outline-none w-72 px-2 py-1"
          />
          <label htmlFor="Email" className="text-blue-500">
            Enter your email:
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your Email"
            autoComplete="off"
            className="border-2 border-blue-500 rounded shadow-sm mb-4 outline-none w-72 px-2 py-1"
          />
          <label htmlFor="password" className="text-blue-500">
            Enter your password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            className="border-2 border-blue-500 rounded shadow-sm mb-4 outline-none w-72 px-2 py-1"
          />
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <button className="bg-blue-500 px-4 py-2 rounded">
              Signup
            </button>
          )}
        </motion.form>
        <AnimatePresence>
          {error && (
            <motion.div
              className="bg-red-500 text-center mx-auto p-2 text-black rounded"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
              exit={{ scale: 0, transition: { stiffness: 0 } }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
