import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
  const { user } = useAuth();
  const handleForm = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/app/chat/join", {
      method: "POST",
      body: JSON.stringify({ roomId: id, name: user.username }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

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
  };
  return (
    <motion.div
      className="absolute top-0 bg-zinc-800/95 h-full"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <section onClick={closeJoin} className="flex justify-end m-2">
        <FaTimes />
      </section>
      <header className="text-center m-4">
        <div>Join Form</div>
      </header>
      <main>
        <form
          onSubmit={handleForm}
          onFocus={() => setError(null)}
          className="flex flex-col items-center gap-2 text-2xl mt-2 p-2 m-2"
        >
          <label htmlFor="email">Enter Room Id</label>
          <input
            value={id}
            type="text"
            placeholder="Room Id"
            onChange={(e) => setId(e.target.value)}
            className="w-72 p-1 outline-none rounded border-2 border-yellow-500"
          />
          <button className="border-2 border-yellow-500 p-1 rounded">
            Join Room
          </button>
        </form>
        <AnimatePresence>
          {error && (
            <motion.div
              className="bg-red-500 text-center mx-auto w-64 p-1 text-black rounded"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
              exit={{ x: 300, transition: { stiffness: 0 } }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  );
}
