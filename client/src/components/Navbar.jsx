import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/chat-dots.svg";
import {
  AiOutlineBars,
  AiOutlineLogin,
  AiFillEdit,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";
import { BsChatRightTextFill } from "react-icons/bs"
import { BiHomeAlt } from "react-icons/bi"
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "@chakra-ui/react"
import { FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { user, dispatch } = useAuth();
  const [showLinks, setShowLinks] = useState(false);
  const togglePanel = () => setShowLinks(!showLinks);
  const closePanel = () => setShowLinks(false);
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };
  const logoutEffect = () => {
    logout();
    closePanel();
  };
  return (
    <>
       {isLargerThan768 ? (
          <nav>
      <div>
        <NavLink to="/" onClick={closePanel}>
          <img src={Logo} alt="app-logo" />
        </NavLink>
        <div
          onClick={togglePanel}
        >
          {showLinks ? <FaTimes /> : <AiOutlineBars />}
        </div>
      </div>
      <div
        >
        {user && (
          <div>
            <div>
            <BsChatRightTextFill className="mt-1" />
              <NavLink to="/chat" onClick={closePanel}>
                Chat
              </NavLink>
            </div>
            <div className="flex gap-2 cursor-pointer  rounded mr-12 p-2 md:p-2 shadow-none  hover:bg-zinc-800">
              <AiOutlineUser className="mt-1" />
              <NavLink to="/profile" onClick={closePanel}>
                {user.username}
              </NavLink>
            </div>
            <div className="flex gap-2 cursor-pointer  rounded mr-12 p-2 md:p-2 shadow-none  hover:bg-zinc-800">
              <AiOutlineLogout className="mt-1" />
              <div onClick={logoutEffect}>
                Logout
              </div>
            </div>
          </div>
        )}

        {!user && (
          <div className="h-80 flex flex-col justify-center gap-10 ml-10 md:flex-row md:h-10 md:mt-2">
          <div whileHover={{ scale: 1.1 }} className="flex gap-2 cursor-pointer rounded mr-12 p-2 md:p-2 shadow-none  hover:bg-zinc-800">
              <BiHomeAlt className="mt-1" />
              <NavLink to="/" onClick={closePanel}>
                Home
              </NavLink>
            </div>
            <div className="flex gap-2 cursor-pointer  rounded mr-12 p-2 md:p-2 shadow-none  hover:bg-zinc-800">
              <AiFillEdit className="mt-1" />
              <NavLink to="/signup" onClick={closePanel}>
                Signup
              </NavLink>
            </div>
            <div className="flex gap-2 cursor-pointer  rounded mr-12 p-2 md:p-2 hover:bg-zinc-800">
              <AiOutlineLogin className="mt-1" />
              <NavLink to="/login" onClick={closePanel}>
                Login
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
       ) : (
          <nav className="md:flex justify-between">
      <div className="flex justify-between md:mt-2">
        <NavLink to="/" onClick={closePanel}>
          <img src={Logo} alt="app-logo" className="w-48 m-2 md:mt-2" />
        </NavLink>
        <div
          className="text-3xl  m-2 md:hidden"
          onClick={togglePanel}
        >
          {showLinks ? <FaTimes /> : <AiOutlineBars />}
        </div>
      </div>
      <AnimatePresence>
      <motion.div className={
          showLinks
            ? "absolute h-80 w-72 m-4 bg-zinc-900/95 rounded  md:relative flex-row text-3xl"
            : "hidden md:flex flex-row text-2xl"
        } 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, duration: 1 }}
        >
        {user && (
          <div className="h-80 flex flex-col justify-center gap-10 ml-10 md:flex-row md:h-10 md:mt-2">
            <motion.div whileHover={{ scale: 1.1 }} className="flex gap-2 cursor-pointer shadow-sm shadow-zinc-900 rounded mr-12 p-2 md:p-2 shadow-none  hover:bg-zinc-800">
              <BsChatRightTextFill className="mt-1" />
              <NavLink to="/chat" onClick={closePanel}>
                Chat
              </NavLink>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="flex gap-2 cursor-pointer shadow-sm shadow-zinc-900 rounded mr-12 p-2 md:p-2 shadow-none  hover:bg-zinc-800">
              <AiOutlineUser className="mt-1" />
              <NavLink to="/profile" onClick={closePanel}>
                {user.username}
              </NavLink>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="flex gap-2 cursor-pointer shadow-sm shadow-zinc-900 rounded mr-12 p-2 md:p-2 shadow-none  hover:bg-zinc-800">
              <AiOutlineLogout className="mt-1" />
              <div onClick={logoutEffect}>
                Logout
              </div>
            </motion.div>
          </div>
        )}

        {!user && (
          <div className="h-80 flex flex-col justify-center gap-10 ml-10 md:flex-row md:h-10 md:mt-2">
           <motion.div whileHover={{ scale: 1.1 }} className="flex gap-2 cursor-pointer shadow-sm shadow-zinc-900 rounded mr-12 p-2 md:p-2 shadow-none  hover:bg-zinc-800">
              <BiHomeAlt className="mt-1" />
              <NavLink to="/" onClick={closePanel}>
                Home
              </NavLink>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="flex gap-2 cursor-pointer shadow-sm shadow-zinc-900 rounded mr-12 p-2 md:p-2 shadow-none  hover:bg-zinc-800">
              <AiFillEdit className="mt-1" />
              <NavLink to="/signup" onClick={closePanel}>
                Signup
              </NavLink>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="flex gap-2 cursor-pointer shadow-sm shadow-zinc-900 rounded mr-12 p-2 md:p-2 shadow-none  hover:bg-zinc-800">
              <AiOutlineLogin className="mt-1" />
              <NavLink to="/login" onClick={closePanel}>
                Login
              </NavLink>
            </motion.div>
          </div>
        )}
      </motion.div>
      </AnimatePresence>
    </nav>
       )}
    </>
  );
}
