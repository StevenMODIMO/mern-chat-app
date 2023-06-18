import { useState, useEffect, useRef } from "react";
import { BiSend } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import { socket } from "../pages/Chat";
import { useAuth } from "../context/AuthContext";

export default function ChatForm({ data, leave }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { user } = useAuth();
  const chatContainerRef = useRef(null);
  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
    const month = new Date().getMonth() + 1
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
          console.log(json)
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
    <div className="h-screen md:h-0 lg:w-3/6 mx-auto">
      <header className="flex justify-between items-center">
        <div className="flex text-2xl items-center gap-2 m-2">
          <img
            className="shadow-sm shadow-zinc-900 rounded-full mt-3 md:h-6"
            src={`https://api.dicebear.com/5.x/identicon/svg?seed=${data}&size=50&radius=10`}
            alt="avatar"
          />
          <div className="mt-3">{data}</div>
        </div>
        <div
          onClick={leave}
          className="flex items-center cursor-pointer gap-2 border-2 mr-2 p-2 h-10 border-yellow-500 text-2xl rounded md:h-9"
        >
          <ImExit className="mt-1" />
          <div>Leave</div>
        </div>
      </header>
      <div
        ref={chatContainerRef}
        className="h-80 m-2 p-2 rounded bg-zinc-800/95 overflow-scroll overflow-x-hidden"
      >
        {messageList.map((data) => {
              return (
                <main
                  className={
                    data.sender == user.username
                      ? "flex justify-start"
                      : "flex justify-end mr-5"
                  }
                >
                  <div className="flex">
                    <section className="flex gap-1 m-1">
                      <img
                        className="h-5 mt-1 rounded-full"
                        src={`https://api.dicebear.com/5.x/identicon/svg?seed=${data.sender}&size=50&radius=10`}
                        alt="avatar"
                      />
                    </section>
                    <section className="flex bg-zinc-700 text-2xl w-fit p-1 m-1 rounded">
                      <div>{data.message}</div>
                      <div className="mt-7 bg-zinc-800 rounded  px-1 text-xs">
                        {data.time}
                      </div>
                    </section>
                  </div>
                </main>
              );
            })}
      </div>
      <form
        onSubmit={sendMessage}
        className="flex justify-between m-2 border-2 border-yellow-500 bg-black rounded"
      >
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="p-1 outline-none w-72 bg-black md:w-full"
        />
        <button className="text-2xl">
          <BiSend />
        </button>
      </form>
    </div>
  );
}
