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

export default function ShareForm({ closePanel, RoomID }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false) 
  const { user } = useAuth();


  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true)
    const response = await fetch("http://localhost:5000/api/app/chat/share", {
      method: "POST",
      body: JSON.stringify({ receiverEmail: email, RoomID: RoomID }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

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
    setLoading(false)
  };
  return (
    <motion.div
      className="absolute top-0 bg-zinc-800/95 h-full w-full"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div onClick={closePanel} className="flex justify-end m-2 text-4xl text-green-500">
        <FaTimes />
      </div>
      <main>
        <form
          onSubmit={handleForm}
          onFocus={() => setError(null)}
          className="flex flex-col items-center gap-2 text-xl mt-2 p-2 m-2"
        >
          <h1 className="text-green-500 border-b border-green-500">Invite a Friend</h1>
          <label className="text-green-500 -ml-52">Room ID</label>
          <input
            value={RoomID}
            type="text"
            className="w-72 p-1 outline-none rounded border border-green-500"
            readOnly
          />
          <label className="text-green-500 -ml-16">Enter Your Friend's Email</label>
          <input
            value={email}
            type="email"
            placeholder="Friend's Email address"
            onChange={(e) => setEmail(e.target.value)}
            className="w-72 p-1 outline-none rounded border border-green-500"
          />
          {loading ? <div className="mt-5">
            <Loader />
          </div> : <button className="bg-green-500 p-1 mt-5 rounded">
            Share Room
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
