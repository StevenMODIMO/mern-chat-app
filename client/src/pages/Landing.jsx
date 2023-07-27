import { RiGroup2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function Landing({ theme }) {
  const navigate = useNavigate();

  return (
    <div
      className={
        theme === "dark"
          ? "text-xl bg-white p-2 m-2 rounded mt-32"
          : "text-xl bg-black text-white p-2 m-2 rounded mt-32"
      }
    >
      {/**
       * <section>
        <header>
          <div>Hi!</div>
          <div>Welcome to mernChatApp</div>
        </header>
        <main>
          <div>
            <RiGroup2Fill />
          </div>
          <div>
            <h1>
              mernChatApp is a room-based messaging platform that enables people
              to connect and exchange on various aspects of their daily lives.
            </h1>
          </div>
        </main>
      </section>

      <section>
        <div onClick={() => navigate("/signup")}>
          Sign Up to Get Started Now
        </div>
      </section>

      <footer>&copy; mernChatApp 2023</footer>
       */}
    </div>
  );
}
