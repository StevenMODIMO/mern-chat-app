import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion"
import Loader from "../components/Loader"

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

export default function Confirm() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const otv = JSON.parse(localStorage.getItem("OTV"));

  const handleForm = async (e) => {
    const otvUsername = otv.username;
    const otvEmail = otv.email;
    const otvPass = otv.password;
    const otvCode = otv.otp;
    const inputCode = code.toString();
    e.preventDefault();
    setLoading(true)
    const response = await fetch("https://chat-server-d27s.onrender.com/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputCode,
        otvUsername,
        otvEmail,
        otvPass,
        otvCode,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setCode("")
    }

    if (response.ok) {
      setError(null);
      localStorage.removeItem("OTV");
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      navigate("/chat");
    }
    setLoading(false)
  };
  return (
    <div className="mt-20 h-screen">
      <header className="w-fit mx-auto bg-gray-900 text-center text-green-500 p-1 rounded">
        <h1>A code has been sent to your email, Enter it to confirm if this email is active. Please confirm within 24HRS</h1>
      </header>
      <header className="text-center text-3xl mt-2">
        <h2>Confirm Email:</h2>
      </header>
      <main className="flex flex-col items-center">
        <motion.form
          variants={container}
          initial="hidden"
          animate="visible"
          onFocus={() => setError(null)}
          onSubmit={handleForm}
          className="flex flex-col items-center justify-center gap-2 text-2xl mt-2 p-2 m-2 bg-gray-800 rounded"
        >
          
          <input
            type="text"
            autoComplete="off"
            placeholder="Enter confirmation code"
            onChange={(e) => setCode(e.target.value)}
            className="border-2 border-green-500 rounded shadow-sm mb-4 outline-none w-72"
          />
          {loading ? <div>
            <Loader />
          </div> : <button  className="bg-green-500 p-1 rounded">
            Confirm
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
