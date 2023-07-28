import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../components/Loader";
import { BsCode } from "react-icons/bs";


export default function Confirm() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const response = await fetch(
      "https://chat-server-d27s.onrender.com/api/user/signup",
      {
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
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setCode("");
    }

    if (response.ok) {
      setError(null);
      localStorage.removeItem("OTV");
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      navigate("/chat");
    }
    setLoading(false);
  };
  return (
    <div className="mt-32 flex flex-col items-center text-xl">
      <header className="font-bold text-sm text-center">
        <h1>
          A code has been sent to your email, Enter it to confirm if this email
          is active. Please confirm within 24HRS
        </h1>
      </header>
      <main className="border shadow-xl mt-2 mx-4 py-2">
        <form
          onFocus={() => setError(null)}
          onSubmit={handleForm}
          className="flex flex-col gap-4 p-2"
        >
          <label htmlFor="code" className="flex gap-1">
            <BsCode className="mt-1" />
            <h1>Code</h1>
          </label>
          <input
            className="border border-black w-72 p-1 rounded-sm outline-none"
            type="text"
            autoComplete="off"
            placeholder="Enter confirmation code"
            onChange={(e) => setCode(e.target.value)}
          />
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <button className="bg-black text-white mx-auto p-1 rounded-sm">
              Confirm
            </button>
          )}
        </form>
        {error && <div>{error}</div>}
      </main>
    </div>
  );
}
