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

export default function RoomForm({ closeForm }) {
  const [room, setRoom] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      "https://chat-server-d27s.onrender.com/api/app/chat/create",
      {
        method: "POST",
        body: JSON.stringify({ roomName: room }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setRoom("");
    }

    if (response.ok) {
      setError(null);
      setRoom("");
      closeForm();
    }
    setLoading(false);
  };
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        initial="hidden"
        animate="visible"
        exit={{ scale: 0.8 }}
        variants={container}
      >
        <motion.div
          className="bg-white rounded-lg mx-4 p-6 shadow-lg max-w-md w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex justify-end">
            <button onClick={closeForm}>
              <FaTimes />
            </button>
          </div>
          <header>
            <div className="text-xl font-bold mb-4">Create New Room</div>
          </header>
          <main>
            <div className="flex items-center justify-center mb-4">
              <img
                src={`https://api.dicebear.com/5.x/identicon/svg?seed=${room}&size=50&radius=10`}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <form onSubmit={handleForm} onFocus={() => setError(null)}>
              <label htmlFor="roomName" className="block mb-2">
                Enter Room Name
              </label>
              <input
                id="roomName"
                value={room}
                type="text"
                className="w-full border rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g board, skills, test"
                onChange={(e) => setRoom(e.target.value)}
              />
              {error && (
                <div className="text-red-500 text-center mb-2">{error}</div>
              )}
              <div className="text-yellow-500 text-sm text-center mb-2">
                should be less than or equal to 10 characters
              </div>
              {loading ? (
                <div className="flex justify-center">
                  <Loader />
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
                >
                  Create Room
                </button>
              )}
            </form>
          </main>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
