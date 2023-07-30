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
    <div>
      <section onClick={closeForm}>
        <FaTimes />
      </section>
      <header>
        <div>Create New Room</div>
      </header>
      <main>
        <div>
          <img
            src={`https://api.dicebear.com/5.x/identicon/svg?seed=${room}&size=50&radius=10`}
            alt="avatar"
          />
        </div>
        <form onSubmit={handleForm} onFocus={() => setError(null)}>
          <label>Enter Room Name</label>
          <input
            value={room}
            type="text"
            placeholder="e.g board, skills, test"
            onChange={(e) => setRoom(e.target.value)}
          />
          <h1>should be less than or equal to 10 characters</h1>
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <button>Create Room</button>
          )}
        </form>
        {error && <div>{error}</div>}
      </main>
    </div>
  );
}
