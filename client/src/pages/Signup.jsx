import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BsFillKeyFill } from "react-icons/bs";
import Loader from "../components/Loader";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";

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

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      "https://chat-server-d27s.onrender.com/api/user/validate",
      {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setUsername("");
      setEmail("");
      setPassword("");
    }

    if (response.ok) {
      setError(null);
      localStorage.setItem("OTV", JSON.stringify(json));
      navigate("/confirm");
    }
    setLoading(false);
  };

  return (
    <div className="mt-32 flex flex-col items-center text-xl">
      <header className="font-bold">
        <h2>Signup Now</h2>
      </header>
      <main className="border shadow-xl mt-2 mx-4 py-2">
        <form
          onSubmit={handleForm}
          onFocus={() => setError(null)}
          className="flex flex-col gap-4 p-2"
        >
          <div className="m-1">
            <label htmlFor="Name" className="flex gap-1">
              <AiOutlineUser className="mt-1" />
              <h1>Username:</h1>
            </label>
            <input
              className="border border-black w-72 p-1 rounded-sm outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="@username"
              autoComplete="off"
            />
          </div>
          <div className="m-1">
            <label htmlFor="Email" className="flex gap-1">
              <AiOutlineMail className="mt-1" />
              <h1>Email:</h1>
            </label>
            <input
              className="border border-black w-72 p-1 rounded-sm outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your Email"
              autoComplete="off"
            />
          </div>
          <div className="m-1">
            <label htmlFor="password" className="flex gap-1">
              <BsFillKeyFill className="mt-1" />
              <h1>Password:</h1>
            </label>
            <input
              className="border border-black w-72 p-1 rounded-sm outline-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
            />
          </div>
          {loading ? (
            <div className="mx-auto">
              <Loader />
            </div>
          ) : (
            <button className="bg-black text-white mx-auto p-1 rounded-sm">Signup</button>
          )}
        </form>
        {error && <div className="text-red-500 flex justify-center">{error}</div>}
      </main>
    </div>
  );
}
