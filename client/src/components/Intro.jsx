import { BsChatRightTextFill } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { FaShare } from "react-icons/fa";

export default function Intro({ openForm }) {
  return (
    <div>
      <header>
        <div onClick={openForm}>
          <div>
            <BsChatRightTextFill />
          </div>
          Chat Now
        </div>
      </header>
      <main>
        <h1>HI!! 👋 How to get started</h1>
        <section>
          <div>
            <RxDotFilled />
            <h1>Click chat now button to start a chat</h1>
          </div>
          <div>
            <RxDotFilled />
            <h1>Create a new room</h1>
          </div>
          <div>
            <RxDotFilled />
            <h1>Or, join one using ID</h1>
          </div>
          <div>
            <RxDotFilled />
            <h1>Click on the room name to chat</h1>
          </div>
          <div>
            <RxDotFilled />
            <h1>Click this button to invite your friends</h1>
            <FaShare />
          </div>
          <div>
            <RxDotFilled />
            <h1>That's it, happy chatting</h1>
          </div>
        </section>
      </main>
      <footer>
        <span>&copy; mernChatApp 2023</span>
      </footer>
    </div>
  );
}
