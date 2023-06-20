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

export default function RoomForm({ closeForm }) {
  const [room, setRoom] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const { user } = useAuth();
  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true)
    const response = await fetch("http://localhost:5000/api/app/chat/create", {
      method: "POST",
      body: JSON.stringify({ roomName: room }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
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
    setLoading(false)
  };
  return (
    <motion.div
      className="absolute top-0 bg-zinc-800/95 h-full w-full lg:w-96"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <section onClick={closeForm} className="flex justify-end m-2 text-4xl text-green-500">
        <FaTimes />
      </section>
      <header className="text-center border-b-2 border-green-500 text-green-500 m-4">
        <div className="text-green-500 text-xl">Create New Room</div>
      </header>
      <main>
        <div className="flex justify-center">
          <img
            className="shadow-sm shadow-zinc-900 rounded-sm mt-3"
            src={`https://api.dicebear.com/5.x/identicon/svg?seed=${room}&size=50&radius=10`}
            alt="avatar"
          />
        </div>
        <form
          onSubmit={handleForm}
          onFocus={() => setError(null)}
          className="flex flex-col items-center gap-2 text-xl mt-2 p-2 m-2"
        >
          <label className="-ml-32 text-green-500">Enter Room Name</label>
          <input
            value={room}
            type="text"
            placeholder="e.g board, skills, test"
            onChange={(e) => setRoom(e.target.value)}
            className="w-72 p-1 outline-none rounded border border-green-500"
          />
          <h1 className="text-sm text-green-500 mt-3 underline">should be less than or equal to 10 characters</h1>
          {loading ? <div className="mt-5">
            <Loader />
          </div> : <button className="bg-green-500 mt-5 p-1 rounded">
            Create Room
          </button>}
        </form>
        <AnimatePresence>
          {error && (
            <motion.div
              className="bg-red-500 text-center mx-auto mt-5 w-64 p-1 text-black rounded"
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
