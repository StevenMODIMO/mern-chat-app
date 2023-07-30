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

export default function JoinForm({ closeJoin }) {
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
      console.log(json);
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
    <div>
      <section onClick={closeJoin}>
        <FaTimes />
      </section>
      <header>
        <div>Join a room</div>
      </header>
      <main>
        <form onSubmit={handleForm} onFocus={() => setError(null)}>
          <label>Enter Room Id</label>
          <input
            value={id}
            type="text"
            placeholder="Room Id"
            onChange={(e) => setId(e.target.value)}
          />
          {loading ? (
            <div className="mt-5">
              <Loader />
            </div>
          ) : (
            <button>Join Room</button>
          )}
        </form>
        {error && <div>{error}</div>}
      </main>
    </div>
  );
}
