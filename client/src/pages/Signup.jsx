import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"


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
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/user/validate", {
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
  };
  
 
  return (
    <div className="h-screen lg:mt-20">
      <header className="text-center text-3xl mt-2">
        <h2>Signup Form</h2>
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
        <label htmlFor="Name" className="-ml-16 w-50">
            Enter your username:
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="@username"
            autoComplete="off"
            className="border-2 border-yellow-500 rounded shadow-sm mb-4 outline-none w-72"
          />
          <label htmlFor="Email" className="-ml-24 w-48">
            Enter your email:
          </label>
          <input
          value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your Email"
            autoComplete="off"
            className="border-2 border-yellow-500 rounded shadow-sm mb-4 outline-none w-72"
          />
          <label htmlFor="password" className="-ml-16 w-50">
            Enter your password:
          </label>
          <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
          className="border-2 border-yellow-500 rounded shadow-sm mb-4 outline-none w-72"
          />
          <button className="border-2 border-yellow-500 p-1 rounded">
            Signup
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
      </main>
    </div>
  );
}
