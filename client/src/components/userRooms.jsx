import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { AiFillPlusSquare, AiOutlineShareAlt } from "react-icons/ai";
import { TbMoodSuprised } from "react-icons/tb";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import RoomForm from "./roomForm";
import ShareForm from "./shareForm";
import JoinForm from "./joinForm";
import Loader from "./Loader"

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
  }, [userRooms]);

  return (
    <div className="bg-white shadow-lg mx-2 p-4 rounded-lg max-h-72 overflow-y-auto md:w-96">
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
      {showForm && <RoomForm closeForm={closeForm} />}
      <div className="flex space-x-4">
      <header
        onClick={openForm}
        className="flex items-center cursor-pointer px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        <AiFillPlusSquare className="text-xl" />
        <div className="ml-2">New Room</div>
      </header>
      <header
        onClick={openJoin}
        className="flex items-center cursor-pointer px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        <AiFillPlusSquare className="text-xl" />
        <div className="ml-2">Join Room</div>
      </header>
    </div>
      <div>
        {userRooms.length === 0 && joined.length === 0 ? (
          <section className="text-center font-bold m-6">
            <div>Chat Rooms Appear here</div>
          </section>
        ) : (
          <div className="font-semibold text-lg mb-2 text-end m-4">Chat Rooms</div>
        )}
        {userRooms.map((room) => (
          <div
            key={room._id}
            className="flex items-center justify-between p-2 border rounded-lg mb-2 cursor-pointer transition-all duration-300 hover:bg-gray-100"
          >
            <main
              onClick={() => {
                joinRoom(room.roomName);
                close();
                sendData(room.roomName);
              }}
              className="flex items-center space-x-4 cursor-pointer"
            >
              <img
                src={`https://api.dicebear.com/5.x/identicon/svg?seed=${room.roomName}&size=50&radius=10`}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <section>
                <div className="font-bold">{room.roomName}</div>
                <div>{room.chats.length} Chats</div>
                <div>{room.users.length} Members</div>
              </section>
            </main>
            <div
              onClick={() => {
                setId(room._id);
                openPanel();
              }}
              className="text-blue-500 text-xl cursor-pointer"
            >
              <AiOutlineShareAlt title="Share Room" />
            </div>
          </div>
        ))}
        {joined.map((room) => (
          <div
            key={room._id}
            className="flex items-center justify-between p-2 border rounded-lg mb-2 cursor-pointer transition-all duration-300 hover:bg-gray-100"
          >
            <main
              onClick={() => {
                joinRoom(room.roomName);
                close();
                sendData(room.roomName);
              }}
              className="flex items-center space-x-4 cursor-pointer"
            >
              <img
                src={`https://api.dicebear.com/5.x/identicon/svg?seed=${room.roomName}&size=50&radius=10`}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <section>
                <div>{room.roomName}</div>
                <div>{room.chats.length} Chats</div>
                <div>{room.users.length} Members</div>
              </section>
            </main>
          </div>
        ))}
      </div>
    </div>
  );
}
