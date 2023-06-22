import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"
import Loader from "../components/Loader"


const container = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.8
    }
  }
}


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true)
    const response = await fetch("https://chat-server-d27s.onrender.com/api/user/validate", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setUsername("")
      setEmail("");
      setPassword("");
    }

    if (response.ok) {
      setError(null); 
      console.log(json);
      localStorage.setItem("OTV", JSON.stringify(json))
      navigate("/confirm");
    }
    setLoading(false)
  };
  
 
  return (
    <div className="h-screen lg:mt-20">
      <header className="text-center text-3xl mt-2">
        <h2>Signup Now</h2>
      </header>
      <main className="flex flex-col items-center">
        <motion.form
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-2 text-xl mt-2 p-2 m-2 bg-gray-800 rounded"
          onSubmit={handleForm}
          onFocus={() => setError(null)}
        >
        <label htmlFor="Name" className="-ml-24 w-50 text-green-500">
            Enter your username:
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="@username"
            autoComplete="off"
            className="border-2 border-green-500 rounded shadow-sm mb-4 outline-none w-72"
          />
          <label htmlFor="Email" className="-ml-24 w-48 text-green-500">
            Enter your email:
          </label>
          <input
          value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your Email"
            autoComplete="off"
            className="border-2 border-green-500 rounded shadow-sm mb-4 outline-none w-72"
          />
          <label htmlFor="password" className="-ml-24 w-50 text-green-500">
            Enter your password:
          </label>
          <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
          className="border-2 border-green-500 rounded shadow-sm mb-4 outline-none w-72"
          />
          {loading ? <div>
            <Loader />
          </div> : <button className="bg-green-500 px-2 py-1 rounded">
            Signup
          </button>}
        </motion.form>
        <AnimatePresence>
          {error && (
          <motion.div
             className="bg-red-500 text-center mx-auto w-64 p-1 text-black rounded"
             initial={{ scale: 0.8}}
             animate={{ scale: 1}}
             transition={{ type: "spring", stiffness: 500}}
             exit={{ scale: 0, transition: { stiffness: 0 } }}
          >
            {error}
          </motion.div>
        )}
        </AnimatePresence>
      </main>
    </div>
  );
}
