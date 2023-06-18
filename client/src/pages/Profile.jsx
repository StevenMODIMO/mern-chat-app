import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FaUserEdit } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineIdentification } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineExitToApp } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { TbMoodSuprised } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import EditForm from "../components/EditForm";
import Loader from "../components/Loader";

export default function Profile() {
  const [modalOpen, setModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(null);
  const [userRooms, setUserRooms] = useState([]);
  const [joined, setJoined] = useState([]);
  const toggleModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/app/profile", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      if (response.ok) {
        setUserInfo(json);
        setLoading(false);
      }

      if (!response.ok) {
        setLoading(false);
      }
    };
    if (user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    const getUserRooms = async () => {
      const response = await fetch("http://localhost:5000/api/app/chat", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setUserRooms(json);
      }
    };
    getUserRooms();
  }, []);

  const deleteAccount = async () => {
    const response = await fetch(
      "http://localhost:5000/api/app/profile/delete",
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      navigate("/");
    }
  };

  useEffect(() => {
    const getJoinedRooms = async () => {
      const response = await fetch("http://localhost:5000/api/app/chat/rooms", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setJoined(json);
      }

      if (!response.ok) {
        console.log(json.error);
      }
    };
    getJoinedRooms();
  }, []);

  const deleteRoom = async (id) => {
    await fetch(`http://localhost:5000/api/app/chat/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const newRooms = userRooms.filter((room) => room._id !== id);
    setUserRooms(newRooms);
  };

  const leaveRoom = async (id) => {
    await fetch(`http://localhost:5000/api/app/chat/delete/join/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    
    const joinedRooms = joined.filter((room) => room._id !== id)
    setJoined(joinedRooms)
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Loader />
        </div>
      ) : (
        <div>
          {modalOpen && <EditForm close={closeModal} />}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mt-5 text-center text-3xl md:mt-28 lg:mt-10">
              Welcome, <span>{userInfo.username}</span>
            </div>
          </motion.div>

          <div className="flex justify-center mt-5">
            <motion.img
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, delay: 0.5 }}
              className="shadow-sm shadow-zinc-900 rounded-full mt-3"
              src={`https://api.dicebear.com/5.x/identicon/svg?seed=${user.email}&size=50&radius=10`}
              alt="avatar"
            />
          </div>

          <div className="flex justify-center mt-5">
            <div
              className="gap-2 text-2xl hover:bg-zinc-800 cursor-pointer shadow-sm shadow-zinc-900 p-2 rounded flex w-36"
              onClick={toggleModal}
            >
              <FaUserEdit className="mt-1" />
              Edit Info
            </div>
          </div>
          <div>
            <div className="lg:flex justify-center">
              <motion.section
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, delay: 1 }}
                className="mx-2 mt-10 p-4 bg-zinc-900/30 shadow-sm shadow-zinc-800 rounded md:flex lg:flex-col items-center lg:w-80"
              >
                <div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
                  className="flex gap-3 m-4"
                >
                  <span>
                    <MdOutlineMarkEmailUnread className="text-3xl" />
                  </span>
                  <div>{userInfo.email}</div>
                </div>

                <div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2, type: "spring", stiffness: 200 }}
                  className="flex gap-3 m-4"
                >
                  <span>
                    <BiUserCircle className="text-3xl" />
                  </span>
                  <div>{userInfo.username}</div>
                </div>

                <div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
                  className="flex gap-3 m-4"
                >
                  <span>
                    <HiOutlineIdentification className="text-3xl" />
                  </span>
                  <div>{userInfo._id}</div>
                </div>
              </motion.section>
            </div>

            <section className="mt-14">
              {userRooms.length == 0 ? (
                <section className="flex flex-col items-center">
                  <div>You Dont have any Rooms</div>
                  <motion.div
                    animate={{ rotate: [360, 180, 360, 180, 360] }}
                    transition={{}}
                  >
                    <TbMoodSuprised className="text-5xl" />
                  </motion.div>
                </section>
              ) : (
                <div className="text-2xl text-center">Manage Rooms</div>
              )}

              {userRooms.map((room) => {
                return (
                  <div className="lg:flex justify-center">
                    <AnimatePresence>
                      <motion.main
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        exit={{ scale: 0, transition: { stiffness: 0 } }}
                        key={room._id}
                        className="bg-zinc-900/30 rounded m-2 p-1 md:text-3xl flex flex-col items-center"
                      >
                        <div>
                          <div className="flex gap-2 m-2">
                            <img
                              className="shadow-sm shadow-zinc-900 h-10 rounded-full mt-3"
                              src={`https://api.dicebear.com/5.x/identicon/svg?seed=${room.roomName}&size=50&radius=10`}
                              alt="avatar"
                            />
                            <h1 className="text-2xl mt-5">{room.roomName}</h1>
                          </div>
                          <div className="flex gap-2 m-3">
                            <span>
                              <HiOutlineIdentification className="text-3xl mt-1" />
                            </span>
                            <div className="mt-1">{room._id}</div>
                          </div>
                          <section className="flex gap-2 m-3">
                            <div>
                              <HiUserGroup className="text-3xl mt-1" />
                            </div>
                            <div className="mt-1 ">
                              Members: {room.users.length}
                            </div>
                          </section>
                          <section className="flex gap-2 m-3">
                            <div>
                              <BiMessageSquareDetail className="text-3xl mt-1" />
                            </div>
                            <div className="mt-1">
                              Messages: {room.chats.length}
                            </div>
                          </section>
                        </div>
                        <div
                          className="text-2xl flex justify-center cursor-pointer p-2 mt-5 bg-red-900/30 rounded"
                          onClick={() => deleteRoom(room._id)}
                        >
                          <RiDeleteBin6Line className="mt-1" />
                          <span>Delete Room</span>
                        </div>
                      </motion.main>
                    </AnimatePresence>
                  </div>
                );
              })}
              {joined.map((room) => {
                return (
                <div className="lg:flex justify-center">
                  <AnimatePresence>
                  <motion.main initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        exit={{ scale: 0, transition: { stiffness: 0 } }}
                        key={room._id}
                        className="bg-zinc-900/30 rounded m-2 p-1 md:text-3xl flex flex-col items-center">
                    <div className="flex gap-2 m-2">
                      <img
                        className="shadow-sm shadow-zinc-900 h-10 rounded-full mt-3"
                        src={`https://api.dicebear.com/5.x/identicon/svg?seed=${room.roomName}&size=50&radius=10`}
                        alt="avatar"
                      />
                      <h1 className="text-2xl mt-5">{room.roomName}</h1>
                    </div>
                     <div className="flex gap-2 m-3">
                            <span>
                              <HiOutlineIdentification className="text-3xl mt-1" />
                            </span>
                            <div className="mt-1">{room._id}</div>
                          </div>
                          <section className="flex gap-2 m-3">
                            <div>
                              <HiUserGroup className="text-3xl mt-1" />
                            </div>
                            <div className="mt-1 ">
                              Members: {room.users.length}
                            </div>
                          </section>
                          <section className="flex gap-2 m-3">
                            <div>
                              <BiMessageSquareDetail className="text-3xl mt-1" />
                            </div>
                            <div className="mt-1">
                              Messages: {room.chats.length}
                            </div>
                          </section>
                    <div onClick={() => leaveRoom(room._id)} className="text-2xl flex justify-center cursor-pointer p-2 mt-5 bg-red-900/30 rounded">
                      <MdOutlineExitToApp className="mt-1" />
                      <span>Leave Room</span>
                    </div>
                  </motion.main>
                  </AnimatePresence>
                  </div>
                );
              })}
            </section>
          </div>
        </div>
      )}

      <div className="lg:flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="mx-2 mt-10 p-4 bg-red-900/30 shadow-sm shadow-zinc-800 rounded md:flex flex-col"
        >
          <div className="text-2xl">
            <div className="flex gap-3 m-4 md:justify-center">
              <FiAlertTriangle className="text-3xl" />
              <div>Danger Zone</div>
            </div>
            <div className="bg-zinc-800/95 rounded p-2 mx-3 text-center">
              Actions in this section cannot be undone
            </div>
          </div>
          <span
            onClick={deleteAccount}
            className="flex gap-3 m-4 bg-red-800/95 p-2 cursor-pointer rounded md:justify-center"
          >
            <RiDeleteBin6Line className="text-3xl" />
            <div className="md:text-2xl">Delete Account</div>
          </span>
        </motion.div>
      </div>
    </div>
  );
}
