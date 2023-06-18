import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
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

export default function EditForm({ close }) {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const { user } = useAuth();

  const handleForm = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:5000/api/app/profile/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ email, username }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmail("");
      setUsername("");
      console.log(json);
    }

    if (response.ok) {
      setError(null);
      setEmail(" ");
      setUsername(" ");
      console.log(json);
    }
  };
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="absolute top-15 bg-zinc-800/95 h-full md:top-20 w-full"
    >
      <div>
        <div onClick={close} className="flex justify-end text-3xl m-2">
          <FaTimes />
        </div>
        <header className="text-3xl text-center">
          <h2>Edit Your Info</h2>
        </header>
        <main>
          <form
            className="flex flex-col items-center gap-2 text-2xl mt-2 p-2 m-2 bg-zinc-800 rounded"
            onSubmit={handleForm}
            onFocus={() => setError(null)}
          >
            <label htmlFor="email" className="-ml-16 w-50">
              Enter your email
            </label>
            <input
              value={email}
              type="email"
              placeholder="Enter new email"
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-yellow-500 rounded shadow-sm mb-4 outline-none w-72"
            />
            <label htmlFor="name" className="-ml-16 w-50">
              Enter username
            </label>
            <input
              value={username}
              type="text"
              placeholder="@username"
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 border-yellow-500 rounded shadow-sm mb-4 outline-none w-72"
            />
            <button className="border-2 border-yellow-500 p-1 rounded">
              Update
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
      </div>
    </motion.div>
  );
}
