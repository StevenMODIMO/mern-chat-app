import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import me from "../assets/me.png"

export default function Alert() {
  const [showAlert, setShowAlert] = useState(false);
  const [showAgain, setShowAgain] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(true);
    }, 3000)

    return () => clearTimeout(timeout);
  }, []);

  return (
    showAlert && showAgain && (
      <div className="fixed top-0 w-72 p-4 text-sm m-6 right-0 text-black bg-gray-100 border border-gray-300 rounded-md shadow-md">
        <h1 className="text-lg font-semibold mb-2">Alert, Hi!</h1>
        <img src={me} alt="biko" className="w-10" />
        <div>
          My servers are always in sleep mode because these projects are just
          for demostration.During this period, you might experience a slight
          delay for this service. I kindly request to click on the{" "}
          <span className="bg-yellow-200 p-1 m-1 rounded">Login</span> or <span className="bg-yellow-200 p-1 m-1 rounded">Signup</span> button until an error
          occurs. Also try refreshing the page and try again.
        </div>
        <p>Really sorry for this inconvenience</p>
        <button
          className="text-lg bg-yellow-200 rounded p-1 m-2"
          onClick={() => setShowAgain(false)}
        >
          Got it!
        </button>
      </div>
    )
  );
}
