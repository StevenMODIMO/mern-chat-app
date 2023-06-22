import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { AiFillPlusSquare } from "react-icons/ai";
import { TbMoodSuprised } from "react-icons/tb";
import { FaShare, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import RoomForm from "./roomForm";
import ShareForm from "./shareForm";
import JoinForm from "./joinForm";

export default function UserRooms({ close, joined, onData, joinRoom }) {
  const [showForm, setShowForm] = useState(false);
  const [Open, Close] = useState(false);
  const [join, setJoin] = useState(false);
  const [id, setId] = useState(null);
  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);
  const closePanel = () => Close(false);
  const openPanel = () => Close(true);
  const openJoin = () => setJoin(true);
  const closeJoin = () => setJoin(false);
  const { user } = useAuth();
  const [userRooms, setUserRooms] = useState([]);

  const sendData = (name) => {
    onData(name);
  };

  useEffect(() => {
    const getUserRooms = async () => {
      const response = await fetch("https://chat-server-d27s.onrender.com/api/app/chat", {
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

  return (
    <motion.div>
      <header
        className="flex cursor-pointer justify-end text-4xl text-green-500 md:text-5xl lg:hidden"
        onClick={close}
      >
        <FaTimes />
      </header>
      {Open && (
        <div>
          <ShareForm closePanel={closePanel} RoomID={id} />
        </div>
      )}
      {join && (
        <div>
          <JoinForm closeJoin={closeJoin} />
        </div>
      )}
      <header
        className="flex gap-1 m-2 p-2 cursor-pointer rounded bg-green-500 lg:mt-5"
        onClick={openForm}
      >
        <AiFillPlusSquare className="mt-1 text-3xl" />
        <div className="text-lg mt-1">New Room</div>
      </header>
      <header
        className="flex gap-1 m-2 p-2 cursor-pointer rounded bg-green-500"
        onClick={openJoin}
      >
        <AiFillPlusSquare className="mt-1 text-3xl" />
        <div className="text-lg mt-1">Join Room</div>
      </header>
      <div>{showForm && <RoomForm closeForm={closeForm} />}</div>
      <div className="overflow-scroll overflow-x-hidden h-72  lg:h-96 border-r-2 border-gray-900 mt-6">
        {userRooms.length == 0 ? (
          <section className="flex flex-col items-center mt-10 text-green-500">
            <div>No Room Chats</div>
            <div
              animate={{ rotate: [360, 180, 360, 180, 360] }}
              transition={{}}
            >
              <TbMoodSuprised className="text-8xl" />
            </div>
          </section>
        ) : (
          <div className="text-2xl text-center text-green-500 border-b-2 border-green-500 mt-3">
            Chat Rooms
          </div>
        )}
        {userRooms.map((room) => {
          return (
            <div
              key={room._id}
              className="flex justify-between bg-gray-800 m-2 p-2 rounded md:p-0 lg:hover:bg-gray-700 cursor-pointer"
            >
              <main
                onClick={() => {
                  joinRoom(room.roomName);
                  close();
                  sendData(room.roomName);
                }}
                className="flex items-center gap-2 cursor-pointer md:w-40"
              >
                <img
                  className="shadow-sm shadow-zinc-900 rounded-sm h-10 -mt-2 md:h-10"
                  src={`https://api.dicebear.com/5.x/identicon/svg?seed=${room.roomName}&size=50&radius=10`}
                  alt="avatar"
                />
                <section>
                  <div className="text-2xl text-green-500">{room.roomName}</div>
                  <div className="text-xs text-green-500">
                    {room.chats.length} Chats
                  </div>
                  <div className="text-xs text-green-500">
                    {room.users.length} Members
                  </div>
                </section>
              </main>
              <div
                onClick={() => {
                  setId(room._id);
                  openPanel();
                }}
                className="text-green-500 mt-5 bg-gray-700 h-fit p-2 rounded lg:mr-4"
              >
                <FaShare title="Share Room" />
              </div>
            </div>
          );
        })}

        {joined.map((room) => {
          return (
            <div
              key={room._id}
              className="flex justify-between bg-zinc-800/80 lg:hover:bg-zinc-700 m-2 p-2 rounded cursor-pointer md:p-0"
            >
              <main
                onClick={() => {
                  joinRoom(room.roomName);
                  close();
                  sendData(room.roomName);
                }}
                className="flex items-center cursor-pointer gap-2 md:w-40"
              >
                <img
                  className="shadow-sm shadow-zinc-900 rounded-sm h-10 -mt-2 md:h-10"
                  src={`https://api.dicebear.com/5.x/identicon/svg?seed=${room.roomName}&size=50&radius=10`}
                  alt="avatar"
                />
                <section>
                  <div className="text-2xl text-green-500">{room.roomName}</div>
                  <div className="text-xs text-green-500">
                    {room.chats.length} Chats
                  </div>
                  <div className="text-xs text-green-500">
                    {room.users.length} Members
                  </div>
                </section>
              </main>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
