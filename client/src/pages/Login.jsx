import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../components/Loader";
import { AiOutlineMail, AiOutlineLink } from "react-icons/ai";
import { BsFillKeyFill } from "react-icons/bs";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
};

export default function Login({theme}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      "https://chat-server-d27s.onrender.com/api/user/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmail("");
      setPassword("");
    }

    if (response.ok) {
      setError(null);
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <div className="mt-32 flex flex-col items-center text-xl">
      <header className="font-bold">
        <h2>Login Form</h2>
      </header>
      <main className={theme === "dark" ? "border shadow-xl mt-2 mx-4 py-2 bg-white" : "border shadow-xl mt-2 mx-4 py-2"}>
        <form
          variants={container}
          initial="hidden"
          animate="visible"
          onSubmit={handleForm}
          onFocus={() => setError(null)}
          className="flex flex-col gap-4 p-2"
        >
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
            <button className="bg-black text-white mx-auto p-1 rounded-sm">
              Login
            </button>
          )}
        </form>
        {error && <div className="text-red-500 flex justify-center">{error}</div>}
        <div className="text-lg flex gap-2 m-4">
          <h2>Don't have an account?</h2>
          <NavLink to="/signup" className="flex gap-1">
            <h1 className="underline">Signup</h1>
            <AiOutlineLink className="mt-1" />
          </NavLink>
        </div>
      </main>
    </div>
  );
}
