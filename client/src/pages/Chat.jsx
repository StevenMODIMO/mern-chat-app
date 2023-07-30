import { useState, useEffect } from "react";
import io from "socket.io-client";
import UserRooms from "../components/userRooms";
import ChatForm from "../components/chatForm";
import Intro from "../components/Intro";
import { useAuth } from "../context/AuthContext";

export const socket = io("https://chat-server-d27s.onrender.com");

const joinRoom = (data) => {
  socket.emit("join-room", data);
};

export default function Chat() {
  const [showForm, setShowForm] = useState(false);
  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);
  const [joined, setJoined] = useState([]);
  const [name, setData] = useState("");
  const { user } = useAuth();

  const handleData = (d) => {
    setData(d);
  };

  const leaveChat = () => setData(null);

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
    };
    getJoinedRooms();
  }, []);

  return (
    <div className="mt-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
      {!name ? (
        <div>
            <UserRooms
              close={closeForm}
              joined={joined}
              onData={handleData}
              joinRoom={joinRoom}
            />
        </div>
      ) : (
        <div>
          <ChatForm name={name} leave={leaveChat} />
        </div>
      )}
    </div>
  );
}
