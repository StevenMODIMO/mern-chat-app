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

  // Animation Variants
  const navVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    visible: {
      type: "spring",
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <nav className="fixed w-full">
      <header
        className={
          theme === "dark"
            ? "flex justify-between text-xl bg-white p-2 m-2 rounded transition-all duration-700 ease-in-out"
            : "flex justify-between text-xl bg-black text-white p-2 m-2 rounded transition-all duration-700 ease-in-out"
        }
      >
        <section className="flex">
          <div to="/" className="flex">
            <section className="flex gap-1">
              <BsFillChatQuoteFill className="mt-1" />
              <h1>mernChat</h1>
            </section>
          </div>

          <div className="hidden lg:block" onClick={toggleTheme}>
            {theme === "dark" ? (
              <BiSun className="mt-1" />
            ) : (
              <BiMoon className="mt-1" />
            )}
          </div>
        </section>
        <section className="flex gap-4 lg:hidden">
          <div className="flex" onClick={toggleTheme}>
            {theme === "dark" ? (
              <BiSun className="mt-1" />
            ) : (
              <BiMoon className="mt-1" />
            )}
          </div>
          <div onClick={togglePanel}>
            {showLinks ? (
              <div>
                <FaTimes className="mt-1" />
              </div>
            ) : (
              <div>
                <HiBars3BottomRight className="mt-1" />
              </div>
            )}
          </div>
        </section>
        <ul className="hidden lg:flex gap-6">
          {!user && (
            <>
              <li className="flex">
                <AiOutlineUserAdd className="mt-1" />
                <NavLink to="/signup">
                  <h1>Sign Up</h1>
                </NavLink>
              </li>
              <li className="flex">
                <AiOutlineLogin className="mt-1" />
                <NavLink to="/login">
                  <h1>Log In</h1>
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li className="flex">
                <AiOutlineHome className="mt-1" />
                <NavLink to="/chat" onClick={closePanel}>
                  <h1>Chat</h1>
                </NavLink>
              </li>
              <li className="flex">
                <AiOutlineUser className="mt-1" />
                <NavLink to="/profile" onClick={closePanel}>
                  <h1>Profile</h1>
                </NavLink>
              </li>
              <li className="flex" onClick={logoutEffect}>
                <AiOutlineLogin className="mt-1" />
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
                  ? "text-xl bg-white p-2 m-2 rounded  h-96 "
                  : "text-xl bg-black text-white p-2 m-2 rounded  h-96 "
              }
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
              exit={{ y: 900 }}
            >
              {!user && (
                <>
                  <li className="flex">
                    <AiOutlineUserAdd className="mt-1" />
                    <NavLink to="/signup" onClick={closePanel}>
                      <h1>Sign Up</h1>
                    </NavLink>
                  </li>
                  <li className="flex">
                    <AiOutlineLogin className="mt-1" />
                    <NavLink to="/login" onClick={closePanel}>
                      <h1>Log In</h1>
                    </NavLink>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li className="flex">
                    <AiOutlineHome className="mt-1" />
                    <NavLink to="/chat" onClick={closePanel}>
                      <h1>Chat</h1>
                    </NavLink>
                  </li>
                  <li className="flex">
                    <AiOutlineUser className="mt-1" />
                    <NavLink to="/profile" onClick={closePanel}>
                      <h1>Profile</h1>
                    </NavLink>
                  </li>
                  <li className="flex" onClick={logoutEffect}>
                    <AiOutlineLogin className="mt-1" />
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
