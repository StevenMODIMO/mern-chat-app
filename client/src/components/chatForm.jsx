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
    socket.on("received", (name) => {
      setMessageList((list) => [...list, name]);
    });

    return () => {
      socket.off("received");
    };
  }, [socket]);

  useEffect(() => {
    if (data) {
      const fetchChatRooms = async () => {
        const response = await fetch(
          `https://chat-server-d27s.onrender.com/api/app/chat/${name}`,
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
  }, [name]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo(
        0,
        chatContainerRef.current.scrollHeight
      );
    }
  }, [messageList]);

  return (
    <div>
      <header>
        <div>
          <img
            src={`https://api.dicebear.com/5.x/identicon/svg?seed=${name}&size=50&radius=10`}
            alt="avatar"
          />
          <div>{name}</div>
          <span>
            <Ping />
          </span>
        </div>
        <div
          onClick={leave}
        >
          <ImExit />
        </div>
      </header>
      <div
        ref={chatContainerRef}
      >
        {messageList.map((name) => {
          return (
            <main
              key={name._id}
            >
              <div>
                <section>
                  <img
                    src={`https://api.dicebear.com/5.x/identicon/svg?seed=${name.sender}&size=50&radius=10`}
                    alt="avatar"
                  />
                </section>
                <section >
                  <div>{name.message}</div>
                  <section>
                  <div>
                    {name.time}
                  </div>
                </section>
                </section>
              </div>
            </main>
          );
        })}
      </div>
      <div
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
      >
        <label
          onClick={() => setPicker(!picker)}
        >
          <BsEmojiDizzy />
        </label>
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Message"
        />
        <button>
          <BiSend />
        </button>
      </form>
      <footer>
        <span>&copy; mernChatApp 2023</span>
      </footer>
    </div>
  );
}