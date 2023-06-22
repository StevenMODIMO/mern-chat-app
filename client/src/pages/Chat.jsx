import { useState, useEffect } from "react";
import io from "socket.io-client";
import UserRooms from "../components/userRooms";
import ChatForm from "../components/chatForm";
import Intro from "../components/Intro";
import { useAuth } from "../context/AuthContext";

export const socket = io("http://localhost:5000");

const joinRoom = (data) => {
  socket.emit("join-room", data);
};

export default function Chat() {
  const [showForm, setShowForm] = useState(false);
  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);
  const [joined, setJoined] = useState([]);
  const [data, setData] = useState("");
  const { user } = useAuth();

  const handleData = (d) => {
    setData(d);
  };

  const leaveChat = () => setData(null);

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
    };
    getJoinedRooms();
  }, []);

  return (
    <div className={data ? "bg-gray-900 h-screen" : "h-screen"}>
      {!data ? (
        <div>
          <Intro openForm={openForm} />
        </div>
      ) : (
        <div>
          <ChatForm data={data} leave={leaveChat} />
        </div>
      )}

      <div
        className={
          showForm
            ? "transition-all duration-300 ease-in-out absolute top-0 left-0 h-full overflow-scroll w-full bg-gray-900 rounded"
            : "transition-all duration-300 ease-in-out absolute top-0 -left-full h-full  w-full bg-gray-900 rounded lg:left-0 lg:w-80 lg:top-12"
        }
      >
        <UserRooms
          close={closeForm}
          joined={joined}
          onData={handleData}
          joinRoom={joinRoom}
        />
      </div>
    </div>
  );
}