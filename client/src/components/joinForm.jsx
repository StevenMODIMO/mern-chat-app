import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./Loader";

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

export default function JoinForm({ closeJoin, theme }) {
  const [id, setId] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      "https://chat-server-d27s.onrender.com/api/app/chat/join",
      {
        method: "POST",
        body: JSON.stringify({ roomId: id, name: user.username }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      setError(null);
      setId("");
      closeJoin();
    }

    if (!response.ok) {
      setError(json.error);
      setId("");
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={container}
      >
        <motion.div
          className={
            theme === "dark"
              ? "bg-gray-800 rounded-lg p-6 mx-4 shadow-lg max-w-md w-full"
              : "bg-white rounded-lg p-6 mx-4 shadow-lg max-w-md w-full"
          }
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex justify-end">
            <button onClick={closeJoin}>
              <FaTimes />
            </button>
          </div>
          <header>
            <div className="text-xl font-bold mb-4">Join a Room</div>
          </header>
          <main>
            <form onSubmit={handleForm} onFocus={() => setError(null)}>
              <label htmlFor="roomId" className="block mb-2">
                Enter Room Id
              </label>
              <input
                id="roomId"
                value={id}
                type="text"
                className={
                  theme === "dark"
                    ? "w-full border text-black rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    : "w-full border rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                }
                placeholder="Room Id"
                onChange={(e) => setId(e.target.value)}
              />
              {error && (
                <div className="text-red-500 text-center mb-2">{error}</div>
              )}{" "}
              {/* Display error message */}
              {loading ? (
                <div className="flex justify-center">
                  <Loader />
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
                >
                  Join Room
                </button>
              )}
            </form>
          </main>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
