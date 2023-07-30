import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/chat-dots.svg";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { HiBars3BottomRight } from "react-icons/hi2";
import { BiMoon, BiSun } from "react-icons/bi";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineUser,
} from "react-icons/ai";

export default function Navbar({ theme, setTheme }) {
  const { user, dispatch } = useAuth();
  const [showLinks, setShowLinks] = useState(false);
  const togglePanel = () => setShowLinks(!showLinks);
  const closePanel = () => setShowLinks(false);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const logoutEffect = () => {
    logout();
    setShowLinks(false);
  };

  return (
    <nav className="fixed w-full">
      <header
        className={
          theme === "dark"
            ? "flex justify-between text-xl bg-gray-800 p-2 m-2 rounded transition-all duration-700 ease-in-out"
            : "flex justify-between text-xl bg-white p-2 m-2 rounded transition-all duration-700 ease-in-out shadow-lg"
        }
      >
        <section className="flex gap-4 items-center">
          <div to="/" className="flex items-center">
            <section className="flex items-center gap-1">
              <BsFillChatQuoteFill className="text-blue-500" />
              <h1 className={theme === "dark" ? "text-white" : "text-gray-800"}>
                mernChat
              </h1>
            </section>
          </div>

          <div className="hidden lg:block" onClick={toggleTheme}>
            {theme === "dark" ? (
              <BiSun className="text-yellow-500" />
            ) : (
              <BiMoon className="text-blue-500" />
            )}
          </div>
        </section>
        <section className="flex items-center gap-4 lg:hidden">
          <div className="flex" onClick={toggleTheme}>
            {theme === "dark" ? (
              <BiSun className="text-yellow-500" />
            ) : (
              <BiMoon className="text-black" />
            )}
          </div>
          <div onClick={togglePanel}>
            {showLinks ? (
              <div>
                <FaTimes className="text-red-600" />
              </div>
            ) : (
              <div>
                <HiBars3BottomRight className="text-blue-500" />
              </div>
            )}
          </div>
        </section>
        <ul className="hidden lg:flex gap-6">
          {!user && (
            <>
              <li className="flex gap-1 cursor-pointer">
                <AiOutlineUserAdd className="text-green-500 mt-1" />
                <NavLink
                  to="/signup"
                  className={theme === "dark" ? "text-white" : "text-gray-800"}
                  onClick={closePanel}
                >
                  <h1>Sign Up</h1>
                </NavLink>
              </li>
              <li className="flex gap-1 cursor-pointer">
                <AiOutlineLogin className="text-blue-500 mt-1" />
                <NavLink
                  to="/login"
                  className={theme === "dark" ? "text-white" : "text-gray-800"}
                  onClick={closePanel}
                >
                  <h1>Log In</h1>
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li className="flex gap-1 cursor-pointer">
                <AiOutlineHome className="text-yellow-500 mt-1" />
                <NavLink
                  to="/"
                  className={theme === "dark" ? "text-white" : "text-gray-800"}
                  onClick={closePanel}
                >
                  <h1>Chat</h1>
                </NavLink>
              </li>
              <li className="flex gap-1 cursor-pointer">
                <AiOutlineUser className="text-purple-500 mt-1" />
                <NavLink
                  to="/profile"
                  className={theme === "dark" ? "text-white" : "text-gray-800"}
                  onClick={closePanel}
                >
                  <h1>Profile</h1>
                </NavLink>
              </li>
              <li
                className="flex gap-1 cursor-pointer"
                onClick={logoutEffect}
              >
                <AiOutlineLogin className="text-red-500 mt-1" />
                <h1>Log Out</h1>
              </li>
            </>
          )}
        </ul>
      </header>
      <div className="lg:hidden">
        <AnimatePresence>
          {showLinks && (
            <motion.ul
              className={
                theme === "dark"
                  ? "text-xl bg-gray-800 p-2 m-2 rounded shadow-lg"
                  : "text-xl bg-white p-2 m-2 rounded shadow-lg"
              }
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
              exit={{ y: 900 }}
            >
              {!user && (
                <>
                  <li className="flex gap-1">
                    <AiOutlineUserAdd className="text-green-500 mt-1" />
                    <NavLink
                      to="/signup"
                      className={theme === "dark" ? "text-white" : "text-gray-800"}
                      onClick={closePanel}
                    >
                      <h1>Sign Up</h1>
                    </NavLink>
                  </li>
                  <li className="flex gap-1">
                    <AiOutlineLogin className="text-blue-500 mt-1" />
                    <NavLink
                      to="/login"
                      className={theme === "dark" ? "text-white" : "text-gray-800"}
                      onClick={closePanel}
                    >
                      <h1>Log In</h1>
                    </NavLink>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li className="flex gap-1">
                    <AiOutlineHome className="text-yellow-500 mt-1" />
                    <NavLink
                      to="/"
                      className={theme === "dark" ? "text-white" : "text-gray-800"}
                      onClick={closePanel}
                    >
                      <h1>Chat</h1>
                    </NavLink>
                  </li>
                  <li className="flex gap-1">
                    <AiOutlineUser className="text-purple-500 mt-1" />
                    <NavLink
                      to="/profile"
                      className={theme === "dark" ? "text-white" : "text-gray-800"}
                      onClick={closePanel}
                    >
                      <h1>Profile</h1>
                    </NavLink>
                  </li>
                  <li
                    className="flex gap-1 cursor-pointer"
                    onClick={logoutEffect}
                  >
                    <AiOutlineLogin className="text-red-500 mt-1" />
                    <h1>Log Out</h1>
                  </li>
                </>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
