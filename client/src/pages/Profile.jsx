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
      const response = await fetch(
        "https://chat-server-d27s.onrender.com/api/app/profile",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

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
      const response = await fetch(
        "https://chat-server-d27s.onrender.com/api/app/chat",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setUserRooms(json);
      }
    };
    getUserRooms();
  }, []);

  const deleteAccount = async () => {
    const response = await fetch(
      "https://chat-server-d27s.onrender.com/api/app/profile/delete",
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
      const response = await fetch(
        "https://chat-server-d27s.onrender.com/api/app/chat/rooms",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
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
    await fetch(
      `https://chat-server-d27s.onrender.com/api/app/chat/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const newRooms = userRooms.filter((room) => room._id !== id);
    setUserRooms(newRooms);
  };

  const leaveRoom = async (id) => {
    await fetch(
      `https://chat-server-d27s.onrender.com/api/app/chat/delete/join/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const joinedRooms = joined.filter((room) => room._id !== id);
    setJoined(joinedRooms);
  };

  return (
    <div className="mt-16 mx-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
      {loading ? (
        <div className="flex justify-center mt-72">
          <Loader />
        </div>
      ) : (
        <div className="text-xl">
          <div>
            {modalOpen && <EditForm close={closeModal} />}
            <section className="mx-6 rounded border">
              <div>
                <div className="flex justify-center">
                  <div className="font-thin">
                    Welcome, <span>{userInfo.username}</span>
                  </div>
                </div>

                <div className="flex justify-center m-4">
                  <img
                    src={`https://api.dicebear.com/5.x/identicon/svg?seed=${user.email}&size=50&radius=10`}
                    alt="avatar"
                    className="shadow-lg rounded-2xl"
                  />
                </div>
              </div>

              <div className="mt-6">
                <section>
                  <div className="flex gap-1 text-sm my-2 font-thin ml-6">
                    <span>
                      <MdOutlineMarkEmailUnread className="mt-1" />
                    </span>
                    <div>{userInfo.email}</div>
                  </div>

                  <div className="flex gap-1 text-sm my-2 font-thin ml-6">
                    <span>
                      <BiUserCircle className="mt-1" />
                    </span>
                    <div>{userInfo.username}</div>
                  </div>

                  <div className="flex gap-1 text-sm my-2 font-thin ml-6">
                    <span>
                      <HiOutlineIdentification className="mt-1" />
                    </span>
                    <div>{userInfo._id}</div>
                  </div>
                </section>
              </div>
            </section>
            <div>
              <section>
                <section>
                  {userRooms.map((room) => {
                    return (
                      <div
                        key={room._id}
                        className="my-4 p-4 bg-white shadow-md rounded"
                      >
                        <main className="flex items-center">
                          <div className="mr-4">
                            <img
                              src={`https://api.dicebear.com/5.x/identicon/svg?seed=${room.roomName}&size=25&radius=10`}
                              alt="avatar"
                            />
                          </div>
                          <div>
                            <h1 className="text-lg font-bold">
                              {room.roomName}
                            </h1>
                            <div className="flex items-center mt-2 text-sm">
                              <HiOutlineIdentification className="mr-1" />
                              <div>{room._id}</div>
                            </div>
                            <section className="flex items-center mt-2 text-sm">
                              <HiUserGroup className="mr-1" />
                              <div>Members: {room.users.length}</div>
                            </section>
                            <section className="flex items-center mt-2 text-sm">
                              <BiMessageSquareDetail className="mr-1" />
                              <div>Messages: {room.chats.length}</div>
                            </section>
                          </div>
                        </main>
                        <div
                          className="flex justify-end cursor-pointer"
                          onClick={() => deleteRoom(room._id)}
                        >
                          <RiDeleteBin6Line />
                        </div>
                      </div>
                    );
                  })}
                </section>
                <section>
                  <>
                    {joined.map((room) => {
                      return (
                        <div
                          key={room._id}
                          className="my-4 p-4 bg-white shadow-md rounded"
                        >
                          <main className="flex items-center">
                            <div className="mr-4">
                              <img
                                src={`https://api.dicebear.com/5.x/identicon/svg?seed=${room.roomName}&size=50&radius=10`}
                                alt="avatar"
                              />
                            </div>
                            <div>
                              <h1 className="text-lg font-bold">
                                {room.roomName}
                              </h1>
                              <div className="flex items-center mt-2 text-sm">
                                <HiOutlineIdentification className="mr-1" />
                                <div>{room._id}</div>
                              </div>
                              <section className="flex items-center mt-2 text-sm">
                                <HiUserGroup className="mr-1" />
                                <div>Members: {room.users.length}</div>
                              </section>
                              <section className="flex items-center mt-2 text-sm">
                                <BiMessageSquareDetail className="mr-1" />
                                <div>Messages: {room.chats.length}</div>
                              </section>
                            </div>
                            <div
                              className="ml-auto cursor-pointer"
                              onClick={() => leaveRoom(room._id)}
                            >
                              <MdOutlineExitToApp />
                              <span>Leave Room</span>
                            </div>
                          </main>
                        </div>
                      );
                    })}
                  </>
                </section>
              </section>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-red-100 border border-red-300 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FiAlertTriangle className="mr-2 text-red-500" />
                <div className="text-red-600 font-semibold">Danger Zone</div>
              </div>
              <div className="text-sm text-gray-600">
                Actions in this section cannot be undone
              </div>
              <div
                className="mt-4 cursor-pointer flex items-center text-red-600"
                onClick={deleteAccount}
              >
                <RiDeleteBin6Line className="mr-2" />
                <div>Delete Account</div>
              </div>
            </div>
          </div>
          <footer className="mt-auto py-2 text-center text-gray-500 text-sm">
            <span>&copy; mernChatApp 2023</span>
          </footer>
        </div>
      )}
    </div>
  );
}
