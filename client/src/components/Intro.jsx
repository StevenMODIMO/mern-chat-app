import { BsChatRightTextFill } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { FaShare } from "react-icons/fa";

export default function Intro({ openForm }) {
  return (
    <div className="h-screen lg:h-72">
      <header className="flex justify-center mt-5">
        <div
          onClick={openForm}
          className="flex cursor-pointer gap-2 p-2 bg-green-500 text-3xl text-center rounded"
        >
          <div>
            <BsChatRightTextFill className="mt-1" />
          </div>
          Chat Now
        </div>
      </header>
      <main className="bg-gray-900 mx-3 rounded text-green-500 h-4/6 w-auto mt-5 lg:w-96 mx-auto mt-16 lg:h-80">
        <h1 className="border-b border-green-500 text-xl text-center p-2">
          HI!! 👋 How to get started
        </h1>
        <section className="">
          <div className="flex">
            <RxDotFilled className="text-4xl" />
            <h1 className="text-sm mt-2">
              Click chat now button to start a chat
            </h1>
          </div>
          <div className="flex">
            <RxDotFilled className="text-4xl" />
            <h1 className="text-sm mt-2">Create a new room</h1>
          </div>
          <div className="flex">
            <RxDotFilled className="text-4xl" />
            <h1 className="text-sm mt-2">Or, join one using ID</h1>
          </div>
          <div className="flex">
            <RxDotFilled className="text-4xl" />
            <h1 className="text-sm mt-2">Click on the room name to chat</h1>
          </div>
          <div className="flex">
            <RxDotFilled className="text-4xl" />
            <h1 className="text-sm mt-2">
              Click this button to invite your friends
            </h1>
            <FaShare className="mt-2 ml-2" />
          </div>
          <div className="flex">
            <RxDotFilled className="text-4xl" />
            <h1 className="text-sm mt-2">That's it, happy chatting</h1>
          </div>
        </section>
      </main>
      <footer className="text-green-400 rounded w-full mx-auto p-1 bg-gray-900 text-center mt-5 lg:mt-40">
        <span className="text-xs">&copy; mernChatApp 2023</span>
      </footer>
    </div>
  );
}
