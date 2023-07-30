import { useState, useEffect, useRef } from "react";
import { BiSend } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import { socket } from "../pages/Chat";
import { useAuth } from "../context/AuthContext";
import Ping from "./Ping";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiDizzy } from "react-icons/bs";

export default function ChatForm({ name, leave }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [picker, setPicker] = useState(false);
  const { user } = useAuth();
  const chatContainerRef = useRef(null);
  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const month = new Date().getMonth() + 1;
      const messageData = {
        room: name,
        message: currentMessage,
        time: `${new Date().getFullYear()}/${month}/${new Date().getDate()}/${new Date(
          Date.now()
        ).getHours()}:${new Date(Date.now()).getMinutes()}`,
        sender: user.username,
      };
      socket.emit("message", messageData);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("received", (name) => {
      setMessageList((list) => [...list, name]);
    });

    return () => {
      socket.off("received");
    };
  }, [socket]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const response = await fetch(
        `https://chat-server-d27s.onrender.com/api/app/chat/${name}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        const json = await response.json();
        setMessageList(json);
      }
    };
    fetchChatRooms();
  }, [name, user.token]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo(
        0,
        chatContainerRef.current.scrollHeight
      );
    }
  }, [messageList]);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
      <header className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={`https://api.dicebear.com/5.x/identicon/svg?seed=${name}&size=50&radius=10`}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-2 font-medium text-lg">{name}</div>
          <span className="ml-2">
            <Ping />
          </span>
        </div>
        <div onClick={leave} className="cursor-pointer">
          <ImExit className="text-red-600 text-lg" />
        </div>
      </header>
      <div className="flex-1 p-4 overflow-y-auto" ref={chatContainerRef}>
        {messageList.map((name) => (
          <main
            key={name._id}
            className={
              name.sender == user.username
                ? "flex justify-start"
                : "flex justify-end mr-5"
            }
          >
            <section className="flex items-start space-x-2">
              <img
                src={`https://api.dicebear.com/5.x/identicon/svg?seed=${name.sender}&size=50&radius=10`}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex flex-col">
                <div className="text-gray-600 font-medium">{name.sender}</div>
                <div className="bg-gray-100 px-3 py-2 rounded-lg break-words max-w-[80%]">
                  {name.message}
                </div>
                <div className="text-gray-400 text-xs mt-1">{name.time}</div>
              </div>
            </section>
          </main>
        ))}
      </div>
      <div
        className={`${
          picker ? "block" : "hidden"
        } md:hidden bg-white p-4 shadow-md`}
      >
        <Picker
          data={data}
          onEmojiSelect={(emoji) =>
            setCurrentMessage(currentMessage + emoji.native)
          }
          maxFrequentRows={0}
          searchPosition="none"
          theme="dark"
          previewPosition="none"
          icons="solid"
          emojiSize="20"
          perLine="6"
        />
      </div>
      <form className="p-4 border-t flex items-center" onSubmit={sendMessage}>
        <label
          onClick={() => setPicker(!picker)}
          className="cursor-pointer mr-2"
        >
          <BsEmojiDizzy className="text-gray-600 text-xl" />
        </label>
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Message"
          className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="submit"
          className="ml-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2"
        >
          <BiSend className="text-xl" />
        </button>
      </form>
      <footer className="p-4 border-t text-center text-gray-500 text-xs">
        &copy; mernChatApp 2023
      </footer>
    </div>
  );
}
