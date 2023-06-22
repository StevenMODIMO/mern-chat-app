import { RiGroup2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-900 text-green-600 h-screen flex flex-col md:items-center">
      <section>
        <header className="text-center">
          <div className="text-5xl ">Hi!</div>
          <div className="text-2xl">Welcome to mernChatApp</div>
        </header>
        <main>
          <div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex justify-center text-9xl"
          >
            <RiGroup2Fill />
          </div>
          <div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h1 className="font-mono text-center text-lg md:w-3/6 mx-auto">
              mernChatApp is a room based messaging platform that enables people
              to connect and exchange on various aspects of their daily lives
            </h1>
          </div>
        </main>
      </section>

      <section>
        <div
          className="bg-green-500 text-gray-900 text-center p-5 mx-5 mt-3 rounded cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Sign Up to get started now
        </div>
      </section>

      <footer className="text-green-400 rounded w-full mx-auto p-1 text-center mt-5">
        <span className="text-xs">&copy; mernChatApp 2023</span>
      </footer>
    </div>
  );
}
