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

    const joinedRooms = joined.filter((room) => room._id !== id);
    setJoined(joinedRooms);
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Loader />
        </div>
      ) : (
        <div className="lg:flex gap-28">
          {modalOpen && <EditForm close={closeModal} />}
          <section className="lg:shadow-2xl shadow-green-400 rounded mt-4 ml-4 ltr:shadow-2xl h-fit pb-5 pr-5">
            <div className="lg:">
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mt-5 text-center text-3xl md: lg:mt-10">
                  Welcome, <span>{userInfo.username}</span>
                </div>
              </motion.div>

              <div className="flex justify-center mt-5 md:mt-0 lg:mt-5">
                <motion.img
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, delay: 0.5 }}
                  className="shadow-sm shadow-zinc-900 rounded-full mt-3"
                  src={`https://api.dicebear.com/5.x/identicon/svg?seed=${user.email}&size=50&radius=10`}
                  alt="avatar"
                />
              </div>

              <div className="flex justify-center mt-5 lg:mt-10">
                <div
                  className="gap-2 text-2xl bg-green-500 hover:bg-white hover:text-green-500 cursor-pointer shadow-sm shadow-zinc-900 p-2 rounded flex w-36"
                  onClick={toggleModal}
                >
                  <FaUserEdit className="mt-1" />
                  Edit Info
                </div>
              </div>
            </div>

            <div className="md:flex justify-center lg:mt-10 ml-4">
              <motion.section
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, delay: 1 }}
                className="-ml-5 mt-10 p-4 bg-gray-900 w-72 text-green-500 rounded sm:w-auto md:w-80"
              >
                <h1 className="text-center underline md:text-xl">
                  Profile Info:
                </h1>
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
          </section>
          <div>
            <section className="mt-14 lg:mt-5">
              {userRooms.length == 0 ? (
                <section className="flex flex-col items-center lg:ml-72 lg:mt-60">
                  <div>Sorry!! You Don't have any Rooms</div>
                  <motion.div
                    animate={{ rotate: [360, 180, 360, 180, 360] }}
                    transition={{}}
                  >
                    <TbMoodSuprised className="text-5xl lg:text-9xl" />
                  </motion.div>
                </section>
              ) : (
                <div className="text-2xl text-center underline text-green-500">
                  Manage Rooms
                </div>
              )}

              <section className="md:grid grid-cols-2 lg:shadow-2xl mr-5 p-3 rounded  overflow-auto">
                {userRooms.map((room) => {
                  return (
                    <div key={room._id}>
                      <motion.main
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        key={room._id}
                        className="bg-gray-900 text-green-500 rounded m-2 p-1 md:text-xl"
                      >
                        <section>
                          <div>
                            <div className="flex gap-2 m-2">
                              <img
                                className="h-5 rounded-full mt-3"
                                src={`https://api.dicebear.com/5.x/identicon/svg?seed=${room.roomName}&size=50&radius=10`}
                                alt="avatar"
                              />
                              <h1 className="text-xl mt-2">{room.roomName}</h1>
                            </div>
                            <div className="flex gap-2">
                              <span>
                                <HiOutlineIdentification className="text-3xl mt-1" />
                              </span>
                              <div className="mt-1">{room._id}</div>
                            </div>
                            <section className="flex gap-2">
                              <div>
                                <HiUserGroup className="text-3xl mt-1" />
                              </div>
                              <div className="mt-2 ">
                                Members: {room.users.length}
                              </div>
                            </section>
                            <section className="flex gap-2 mt-1">
                              <div>
                                <BiMessageSquareDetail className="text-3xl mt-1" />
                              </div>
                              <div className="mt-2">
                                Messages: {room.chats.length}
                              </div>
                            </section>
                          </div>
                          <div
                            className="text-xl flex justify-center gap-2 cursor-pointer p-2 mt-5 bg-red-900/30 rounded"
                            onClick={() => deleteRoom(room._id)}
                          >
                            <RiDeleteBin6Line className="mt-1" />
                            <span>Delete Room</span>
                          </div>
                        </section>
                      </motion.main>
                    </div>
                  );
                })}
              </section>
              <section className="md:grid grid-cols-2 lg:mt-10 shadow-2xl rounded">
                <>
                  {joined.map((room) => {
                    return (
                      <div key={room._id}>
                        <h1 className="text-center underline text-2xl text-green-500">
                          Rooms you joined
                        </h1>
                        <motion.main
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          key={room._id}
                          className="bg-gray-900 text-green-500 rounded m-2 p-1 md:text-xl"
                        >
                          <div className="flex gap-2 m-2">
                            <img
                              className="h-5 rounded-full mt-3"
                              src={`https://api.dicebear.com/5.x/identicon/svg?seed=${room.roomName}&size=50&radius=10`}
                              alt="avatar"
                            />
                            <h1 className="text-xl mt-2">{room.roomName}</h1>
                          </div>
                          <div className="flex gap-2">
                            <span>
                              <HiOutlineIdentification className="text-3xl mt-1" />
                            </span>
                            <div className="mt-1">{room._id}</div>
                          </div>
                          <section className="flex gap-2">
                            <div>
                              <HiUserGroup className="text-3xl mt-1" />
                            </div>
                            <div className="mt-1 ">
                              Members: {room.users.length}
                            </div>
                          </section>
                          <section className="flex gap-2 mt-1">
                            <div>
                              <BiMessageSquareDetail className="text-3xl mt-1" />
                            </div>
                            <div className="mt-2">
                              Messages: {room.chats.length}
                            </div>
                          </section>
                          <div
                            onClick={() => leaveRoom(room._id)}
                            className="text-2xl flex justify-center gap-2 cursor-pointer p-2 mt-5 bg-red-900/30 rounded"
                          >
                            <MdOutlineExitToApp className="mt-1" />
                            <span>Leave Room</span>
                          </div>
                        </motion.main>
                      </div>
                    );
                  })}
                </>
              </section>
            </section>
          </div>
        </div>
      )}

      <div className="lg:flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="mx-2 mt-10 p-4 bg-gray-900 shadow-sm shadow-zinc-800 rounded md:flex flex-col"
        >
          <div className="text-2xl">
            <div className="flex gap-3 ml-5 mb-5 text-red-500 md:justify-center">
              <FiAlertTriangle className="text-3xl" />
              <div>Danger Zone</div>
            </div>
            <div className="bg-zinc-800/95 rounded p-2 text-lg text-green-500 mx-3 text-center">
              Actions in this section cannot be undone
            </div>
          </div>
          <span
            onClick={deleteAccount}
            className="flex gap-1 w-fit mx-auto m-4 bg-red-800/95 p-2 cursor-pointer rounded md:justify-center"
          >
            <RiDeleteBin6Line className="text-2xl" />
            <div className="text-xl">Delete Account</div>
          </span>
        </motion.div>
      </div>
      <footer className="text-green-400 rounded w-full mx-auto p-1 bg-gray-900 text-center mt-5">
        <span className="text-xs">&copy; mernChatApp 2023</span>
      </footer>
    </div>
  );
}
