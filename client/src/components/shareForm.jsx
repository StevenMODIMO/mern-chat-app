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

export default function ShareForm({ closePanel, RoomID }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      "https://chat-server-d27s.onrender.com/api/app/chat/share",
      {
        method: "POST",
        body: JSON.stringify({ receiverEmail: email, RoomID: RoomID }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      console.log(json);
      setEmail(" ");
      closePanel();
      setError(null);
    }
    setLoading(false);
  };
  return (
    <div>
      <div onClick={closePanel}>
        <FaTimes />
      </div>
      <main>
        <form onSubmit={handleForm} onFocus={() => setError(null)}>
          <h1>Invite a Friend</h1>
          <label>Room ID</label>
          <input value={RoomID} type="text" readOnly />
          <label>Enter Your Friend's Email</label>
          <input
            value={email}
            type="email"
            placeholder="Friend's Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <button>Share Room</button>
          )}
        </form>
        {error && <div>{error}</div>}
      </main>
    </div>
  );
}
