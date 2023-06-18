import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.8
    }
  }
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

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
      navigate("/chat");
    }
  };
  return (
    <div className="h-screen lg:mt-20">
      <header className="text-center text-3xl mt-2">
        <h2>Login Form</h2>
      </header>
      <main className="flex flex-col items-center">
        <motion.form
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-2 text-2xl mt-2 p-2 m-2 bg-zinc-800 rounded"
          onSubmit={handleForm}
          onFocus={() => setError(null)}
        >
          <label htmlFor="Email"  className="-ml-16 w-50">
            Enter your email:
          </label>
          <input
          value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter your Email"
            autoComplete="off"
            className="border-2 border-yellow-500 rounded shadow-sm mb-4 outline-none w-72"
          />
          <label htmlFor="password" className="-ml-16 w-50">
            Enter your password:
          </label>
          <input
          value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your Password"
            className="border-2 border-yellow-500 rounded shadow-sm mb-4 outline-none w-72"
          />
          <button className="border-2 border-yellow-500 p-1 rounded">
            Login
          </button>
        </motion.form>
        <AnimatePresence>
          {error && (
          <motion.div
             className="bg-red-500 text-center mx-auto w-64 p-1 text-black rounded"
             initial={{ scale: 0.8}}
             animate={{ scale: 1}}
             transition={{ type: "spring", stiffness: 500}}
             exit={{ x: 300, transition: { stiffness: 0 } }}
          >
            {error}
          </motion.div>
        )}
        </AnimatePresence>
        <div className="flex gap-2 justify-center">
          <h2>Don't have an account ? </h2>
          <NavLink
             className="underline"
            to="/signup">
            Signup
          </NavLink>
        </div>
      </main>
    </div>
  );
}
