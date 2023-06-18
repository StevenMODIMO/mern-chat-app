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

  return (
    <motion.div>
      <header className="flex cursor-pointer justify-end text-4xl md:text-5xl" onClick={close}>
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
        className="flex m-2 p-2 cursor-pointer rounded bg-zinc-800/95"
        onClick={openForm}
      >
        <AiFillPlusSquare className="mt-1" />
        <div>New Room</div>
      </header>
      <header
        className="flex m-2 p-2 cursor-pointer rounded bg-zinc-800/95"
        onClick={openJoin}
      >
        <AiFillPlusSquare className="mt-1" />
        <div>Join Room</div>
      </header>
      <div>{showForm && <RoomForm closeForm={closeForm} />}</div>
      <div className="overflow-scroll overflow-x-hidden h-72">
        {userRooms.length == 0 ? (
          <section className="flex flex-col items-center">
            <div>No Rooms</div>
            <div
              animate={{ rotate: [360, 180, 360, 180, 360] }}
              transition={{}}
            >
              <TbMoodSuprised className="text-5xl" />
            </div>
          </section> 
        ) : (
          <div className="text-2xl text-center">Rooms</div>
        )}
        {userRooms.map((room) => {  
          return (
            <div
              key={room._id}
              className="flex justify-between bg-zinc-800/80 m-2 p-2 rounded md:p-0"
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
                  className="shadow-sm shadow-zinc-900 rounded-full mt-3 md:h-10"
                  src={`https://api.dicebear.com/5.x/identicon/svg?seed=${room.roomName}&size=50&radius=10`}
                  alt="avatar"
                />
                <div className="mt-3">{room.roomName}</div>
              </main>
              <div
                onClick={() => {
                  setId(room._id);
                  openPanel();
                }}
                className="bg-zinc-700 p-2 m-2 mt-3 rounded"
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
              className="flex justify-between bg-zinc-800/80 m-2 p-2 rounded md:p-0"
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
                  className="shadow-sm shadow-zinc-900 rounded-full mt-3 md:h-10"
                  src={`https://api.dicebear.com/5.x/identicon/svg?seed=${room.roomName}&size=50&radius=10`}
                  alt="avatar"
                />
                <div>{room.roomName}</div>
              </main>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
