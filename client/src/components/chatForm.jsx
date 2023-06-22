import { useState, useEffect, useRef } from "react";
import { BiSend } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import { socket } from "../pages/Chat";
import { useAuth } from "../context/AuthContext";
import Ping from "./Ping";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiDizzy } from "react-icons/bs";

export default function ChatForm({ data, leave }) {
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
        room: data,
        message: currentMessage,
        time:
          new Date().getFullYear() +
          "/" +
          month +
          "/" +
          new Date().getDate() +
          "/" +
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        sender: user.username,
      };
      socket.emit("message", messageData);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("received", (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socket.off("received");
    };
  }, [socket]);

  useEffect(() => {
    if (data) {
      const fetchChatRooms = async () => {
        const response = await fetch(
          `http://localhost:5000/api/app/chat/${data}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const json = await response.json();

        if (response.ok) {
          setMessageList(json);
        }
      };
      fetchChatRooms();
    }
  }, [data]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo(
        0,
        chatContainerRef.current.scrollHeight
      );
    }
  }, [messageList]);

  return (
    <div className="bg-gray-900 h-fit md:h-0 lg:w-4/4 lg:h-full lg:ml-80">
      <header className="flex justify-between items-center  bg-gray-900">
        <div className="flex text-xl items-center gap-1 ml-3">
          <img
            className="shadow-sm shadow-zinc-900 rounded-sm h-8 md:h-5"
            src={`https://api.dicebear.com/5.x/identicon/svg?seed=${data}&size=50&radius=10`}
            alt="avatar"
          />
          <div className="text-green-500">{data}</div>
          <span>
            <Ping />
          </span>
        </div>
        <div
          onClick={leave}
          className="cursor-pointer gap-2 mr-2 p-2 h-10 text-green-500 text-2xl rounded md:h-9"
        >
          <ImExit className="" />
        </div>
      </header>
      <div
        ref={chatContainerRef}
        className="h-96 p-2 bg-gray-800 overflow-scroll overflow-x-hidden"
      >
        {messageList.map((data) => {
          return (
            <main
              key={data._id}
              className={
                data.sender == user.username
                  ? "flex justify-start"
                  : "flex justify-end mr-5"
              }
            >
              <div className="flex">
                <section className="flex gap-1 m-1">
                  <img
                    className="h-5 mt-1 rounded-sm border-2 border-green-900"
                    src={`https://api.dicebear.com/5.x/identicon/svg?seed=${data.sender}&size=50&radius=10`}
                    alt="avatar"
                  />
                </section>
                <section className="bg-gray-700 text-lg w-fit  my-1 rounded">
                  <div className="text-green-500 px-1">{data.message}</div>
                  <section className="flex justify-end">
                  <div className="rounded-sm bg-gray-800 mb-1 text-green-700 mr-1 w-fit text-xs">
                    {data.time}
                  </div>
                </section>
                </section>
              </div>
            </main>
          );
        })}
      </div>
      <div
        className={
          picker
            ? "block absolute top-10 left-10 transition-all duration-700 ease-in-out"
            : "absolute top-10 -left-64 transition-all duration-700 ease-in-out"
        }
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
      <form
        onSubmit={sendMessage}
        className="mx-1 rounded-lg flex justify-between border border-green-500 bg-gray-700 text-xl lg:mt-20"
      >
        <label
          className="text-green-500 mt-1 text-2xl ml-1"
          onClick={() => setPicker(!picker)}
        >
          <BsEmojiDizzy />
        </label>
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="p-1 outline-none text-green-300 w-80 bg-gray-700 sm:w-full"
          placeholder="Message"
        />
        <button className="text-2xl text-green-500">
          <BiSend />
        </button>
      </form>
      <footer className="text-green-400 w-full mx-auto p-1 bg-gray-900 text-center lg:h-0 border-t-2 border-green-500 lg:mt-20">
        <span className="text-xs lg:text-xl">&copy; mernChatApp 2023</span>
      </footer>
    </div>
  );
}