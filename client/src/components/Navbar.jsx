import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/chat-dots.svg";
import {
  AiOutlineBars,
  AiOutlineLogin,
  AiFillEdit,
  AiOutlineLogout,
  AiOutlineUserAdd,
  AiOutlineUser,
} from "react-icons/ai";
import {
  BsChatRightTextFill,
  BsFacebook,
  BsTwitter,
  BsInstagram,
} from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@chakra-ui/react";
import { FaTimes, FaTiktok } from "react-icons/fa";
import { MdDeveloperMode } from "react-icons/md";

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
      <nav className="rounded md:flex justify-between md:border-b border-black md:text-green-500 md:bg-black md:rounded-none">
        <header
          className={
            showLinks
              ? "flex justify-between bg-gray-900 text-green-500 border-b p-2 border-black"
              : "flex justify-between border-b p-2 border-black md:border-hidden md:bg-gray-900 md:w-2/4 md:pb-4"
          }
        >
          <div className="flex gap-1 ml-3">
            <img src={Logo} alt="logo" className="w-6 mt-1 md:mt-1" />
            <h1 className="text-lg ">mernChatApp</h1>
          </div>
          <div
            onClick={togglePanel}
            className="text-3xl text-green-500 md:hidden"
          >
            {showLinks ? <FaTimes /> : <AiOutlineBars />}
          </div>
        </header>
        <main>
          <nav
            className={
              showLinks
                ? "bg-black h-screen transition-all duration-300 ease-in-out"
                : "bg-black h-0 overflow-hidden transition-all duration-300 ease-in-out md:overflow-visible"
            }
          >
            {!user ? (
              <div className="text-xl pt-2 text-green-500 md:flex gap-3 md:text-lg">
                <section
                  onClick={closePanel}
                  className="flex gap-1 ml-2 mb-4 bg-gray-900 w-36 p-1 rounded sm:w-48 md:w-fit md:bg-black"
                >
                  <BiHomeAlt className="mt-1" />
                  <NavLink to="/">Home</NavLink>
                </section>
                <section
                  onClick={closePanel}
                  className="flex gap-1 ml-2 mb-4 bg-gray-900 w-36 p-1 rounded sm:w-48 md:w-fit md:bg-black"
                >
                  <AiOutlineUserAdd className="mt-1" />
                  <NavLink to="/signup">Sign Up</NavLink>
                </section>
                <section
                  onClick={closePanel}
                  className="flex gap-1 ml-2 mb-4 bg-gray-900 w-36 p-1 rounded sm:w-48 md:w-fit md:bg-black md:mr-2"
                >
                  <AiOutlineLogin className="mt-1" />
                  <NavLink to="/login">Login</NavLink>
                </section>
              </div>
            ) : (
              <div className="text-xl pt-2 text-green-500 md:flex gap-3 md:text-lg">
                <section
                  onClick={closePanel}
                  className="flex gap-1 ml-2 mb-4 bg-gray-900 w-36 p-1 rounded sm:w-48 md:w-fit md:bg-black"
                >
                  <BsChatRightTextFill className="mt-1" />
                  <NavLink to="/chat">Chat</NavLink>
                </section>
                <section
                  onClick={closePanel}
                  className="flex gap-1 ml-2 mb-4 bg-gray-900 w-36 p-1 rounded sm:w-48 md:w-fit md:bg-black"
                >
                  <AiOutlineUser className="mt-1" />
                  <NavLink to="/profile">Profile</NavLink>
                </section>
                <section
                  onClick={logoutEffect}
                  className="flex gap-1 ml-2 mb-4 bg-gray-900 w-36 p-1 rounded sm:w-48 md:w-fit md:mr-2 cursor-pointer md:bg-black"
                >
                  <AiOutlineLogout className="mt-1" />
                  <h1>Logout</h1>
                </section>
              </div>
            )}
            <main className="text-green-500  mb-5 md:hidden">
              <header className="ml-2 border-b-2 w-fit border-green-500 sm:w-44">
                <h1>Upcoming Features</h1>
              </header>
              <div className="text-xl ml-8 mt-2">
                <section className="flex gap-1">
                  <MdDeveloperMode className="mt-1" />
                  <h1>Developers API</h1>
                </section>
              </div>
            </main>
            <main className="text-green-500 md:hidden">
              <header className="ml-2 border-b-2 w-fit border-green-500 sm:w-44">
                <h1>Follow Us</h1>
              </header>
              <div className="">
                <section className="flex gap-1 text-xl mt-2 ml-6 mb-4">
                  <BsFacebook className="mt-1" />
                  <h1>facebook</h1>
                </section>
                <section className="flex gap-1 text-xl ml-6 mb-4">
                  <BsTwitter className="mt-1" />
                  <h1>twitter</h1>
                </section>
                <section className="flex gap-1 text-xl ml-6 mb-4">
                  <BsInstagram className="mt-1" />
                  <h1>instagram</h1>
                </section>
                <section className="flex gap-1 text-xl ml-6 mb-4">
                  <FaTiktok className="mt-1 text-2xl" />
                  <h1>tiktok</h1>
                </section>
              </div>
            </main>
            <footer className="text-green-400 rounded w-fit mx-auto p-1 bg-gray-900 text-center md:hidden">
              <span className="text-xs">&copy; mernChatApp 2023</span>
            </footer>
          </nav>
        </main>
      </nav>
    </>
  );
}
