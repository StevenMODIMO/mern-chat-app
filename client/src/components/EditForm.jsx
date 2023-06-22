import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function EditForm({ close }) {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const { user } = useAuth();

  const handleForm = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://chat-server-d27s.onrender.com/api/app/profile/update",
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
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        exit={{ scale: 0, transition: { stiffness: 0 } }}
        className="absolute top-0 bg-zinc-800/95 h-full w-full md:top-12 md:w-96 md:ml-52 lg:ml-0"
      >
        <div>
          <div
            onClick={close}
            className="flex justify-end text-green-500 text-3xl m-2"
          >
            <FaTimes />
          </div>
          <header className="text-2xl text-green-500 underline text-center">
            <h2>Edit Your Info</h2>
          </header>
          <main>
            <form
              className="flex flex-col items-center gap-2 text-xl mt-10 p-2 m-2 bg-gray-800 shadow-2xl shadow-green-800 rounded"
              onSubmit={handleForm}
              onFocus={() => setError(null)}
            >
              <label htmlFor="email" className="text-green-500 -ml-32 w-50">
                Enter new email
              </label>
              <input
                value={email}
                type="email"
                placeholder="Enter new email"
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-green-500 rounded shadow-sm mb-4 outline-none w-72"
              />
              <label htmlFor="name" className="text-green-500 -ml-24 w-50">
                Enter new username
              </label>
              <input
                value={username}
                type="text"
                placeholder="@username"
                onChange={(e) => setUsername(e.target.value)}
                className="border-2 border-green-500 rounded shadow-sm mb-4 outline-none w-72"
              />
              <button className="bg-green-500 p-1 rounded">Update</button>
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
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
