import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./Loader"

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
  const [loading, setLoading] = useState(false)
  const { user } = useAuth();


  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true)
    const response = await fetch("https://chat-server-d27s.onrender.com/api/app/chat/join", {
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
    setLoading(false)
  };
  return (
    <motion.div
      className="absolute top-0 bg-zinc-800/95 h-full w-full"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <section onClick={closeJoin} className="flex justify-end m-2 text-4xl text-green-500">
        <FaTimes />
      </section>
      <header className="text-center border-b-2 border-green-500 text-green-500 m-4">
        <div className="text-green-500 text-xl">Join a room</div>
      </header>
      <main className="mt-10">
        <form
          onSubmit={handleForm}
          onFocus={() => setError(null)}
          className="flex flex-col items-center gap-2 text-xl mt-2 p-2 m-2"
        >
          <label className="-ml-40 text-green-500">Enter Room Id</label>
          <input
            value={id}
            type="text"
            placeholder="Room Id"
            onChange={(e) => setId(e.target.value)}
            className="w-72 p-1 outline-none rounded border border-green-500"
          />
          {loading ? <div className="mt-5">
            <Loader />
          </div> : <button className="bg-green-500 p-1 mt-5 rounded">
            Join Room
          </button>}
        </form>
        <AnimatePresence>
          {error && (
            <motion.div
              className="bg-red-500 text-center mx-auto w-64 p-1 text-black rounded"
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
    </motion.div>
  );
}
